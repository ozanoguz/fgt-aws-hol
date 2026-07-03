# Section 5: Traffic Inspection

## 5.1 Test Spoke-to-Internet Connectivity

In this test, traffic flows from a spoke VPC through AWS Transit Gateway and FortiGate to the Internet.

The expected traffic path is:

```text
Spoke 1 VM → AWS Transit Gateway → FortiGate → Internet
```

### Connect to the Spoke 1 VM

1. In the AWS Management Console, confirm that the selected Region is **Frankfurt (`eu-central-1`)**.

2. Open the Amazon EC2 console.

3. Select **Instances**.

4. Locate `Spoke1-VM`.

5. Record its public IPv4 address.

   ![Locate the Spoke 1 VM public IP address](/images/spokevm1eip.jpg)

6. Open a terminal on your computer.

7. Change to the directory containing the private key created in Section 1.

8. Connect to `Spoke1-VM` using SSH:

   ```bash
   ssh -i Student01-key.pem ubuntu@<SPOKE1_PUBLIC_IP>
   ```

   Replace:

   - `Student01-key.pem` with the name of your private key file.
   - `<SPOKE1_PUBLIC_IP>` with the public IPv4 address of `Spoke1-VM`.

::: tip
The default username for the Ubuntu instance is:

```text
ubuntu
```
:::

If you are using macOS or Linux and receive a private-key permissions error, run:

```bash
chmod 400 Student01-key.pem
```

Then retry the SSH connection.

### Test Internet Connectivity

9. From the SSH session, test ICMP connectivity through FortiGate:

   ```bash
   ping -c 4 8.8.8.8
   ```

10. Confirm that replies are received.

11. Test HTTPS connectivity to the Fortinet website:

   ```bash
   curl -I https://www.fortinet.com
   ```

A successful test should return an HTTP response header.

If `telnet` is installed, you may also test TCP port `443`:

```bash
telnet www.fortinet.com 443
```

::: info
The spoke instances use a wait-for-FortiGate script.

Their setup completes only after they can successfully reach the Internet through FortiGate.
:::

![Spoke VM egress connectivity test](/images/egresstest.jpg)

### Verify the Egress Traffic Logs

12. In the FortiGate GUI, go to:

    **Log & Report > Forward Traffic**

13. Locate traffic originating from the spoke networks:

    ```text
    10.1.0.0/16
    10.2.0.0/16
    ```

14. Confirm that the preconfigured Internet-access policy processed the traffic.

15. Verify that the traffic action is **Accept**.

![FortiGate egress traffic logs](/images/egresslog.jpg)

::: tip
If the traffic does not appear immediately, wait a few seconds and refresh the log view.
:::

## 5.2 Test Spoke-to-Spoke Connectivity

In this test, traffic flows from Spoke 1 to Spoke 2 through AWS Transit Gateway and FortiGate.

The expected traffic path is:

```text
Spoke 1 VM → AWS Transit Gateway → FortiGate → AWS Transit Gateway → Spoke 2 VM
```

### Create the East-West Firewall Policy

1. In the FortiGate GUI, go to:

   **Policy & Objects > Firewall Policy**

2. Select **Create New**.

3. Create a firewall policy that permits traffic from the Spoke 1 network to the Spoke 2 network.

   ![Create the east-west firewall policy](/images/eastwest1.jpg)

4. Configure the policy as shown in the lab screenshot.

   ![Configure the east-west firewall policy](/images/eastwest2.jpg)

5. Use a descriptive policy name, such as:

   ```text
   Spoke1-to-Spoke2
   ```

6. Confirm that the policy:

   - Uses the interface associated with the AWS Transit Gateway traffic path.
   - Permits traffic from the Spoke 1 network.
   - Permits traffic to the Spoke 2 network.
   - Allows the required services.
   - Has logging enabled.
   - Is enabled.

::: info
Network Address Translation is normally not required for traffic between the spoke networks because both networks use private AWS addresses.
:::

::: warning
Place the new policy above any broader deny policy that could block the spoke-to-spoke traffic.
:::

### Generate East-West Traffic

7. Return to the SSH session connected to `Spoke1-VM`.

8. Test ICMP connectivity to the Spoke 2 web server:

   ```bash
   ping -c 4 10.2.0.100
   ```

9. Test HTTP connectivity to the Spoke 2 web server:

   ```bash
   curl http://10.2.0.100
   ```

10. Confirm that the command returns content from the Spoke 2 web server.

![Test traffic from Spoke 1 to Spoke 2](/images/eastwest3.jpg)

### Verify the East-West Traffic Logs

11. In the FortiGate GUI, go to:

    **Log & Report > Forward Traffic**

12. Locate traffic with:

    - A source address from the Spoke 1 network
    - Destination address `10.2.0.100`
    - The east-west firewall policy created earlier

13. Confirm that the policy processed and accepted the traffic.

![FortiGate east-west traffic logs](/images/eastwest4.jpg)

## 5.3 Test Internet-to-Spoke Connectivity

In this test, FortiGate virtual IP objects publish the spoke web servers to the Internet.

The expected traffic paths are:

```text
Internet → FortiGate TCP port 8081 → Spoke 1 web server TCP port 80
```

```text
Internet → FortiGate TCP port 8082 → Spoke 2 web server TCP port 80
```

### Create the Virtual IP Objects

Create two virtual IP objects using the following values:

| Spoke | External TCP port | Internal web server |
|---|---:|---|
| Spoke 1 | `8081` | `10.1.0.100:80` |
| Spoke 2 | `8082` | `10.2.0.100:80` |

1. In the FortiGate GUI, go to:

   **Policy & Objects > Virtual IPs**

2. Select **Create New > Virtual IP**.

3. Create the virtual IP object for Spoke 1.

   Configure port forwarding from external TCP port `8081` to:

   ```text
   10.1.0.100:80
   ```

   ![Create the Spoke 1 virtual IP object](/images/vip1.jpg)

4. Create the virtual IP object for Spoke 2.

   Configure port forwarding from external TCP port `8082` to:

   ```text
   10.2.0.100:80
   ```

   ![Create the Spoke 2 virtual IP object](/images/vip2.jpg)

::: warning
Use the FortiGate WAN interface as shown in the screenshots.

Do not use the public IP addresses of the spoke VMs for these virtual IP objects.
:::

## 5.4 Create the Ingress Firewall Policy

1. In the FortiGate GUI, go to:

   **Policy & Objects > Firewall Policy**

2. Select **Create New**.

3. Create a firewall policy that permits inbound HTTP traffic from the WAN interface to the two virtual IP objects.

   ![Create the ingress firewall policy](/images/ingresspolicy1.jpg)

4. Configure the policy as shown in the lab screenshot.

   ![Configure the ingress firewall policy](/images/ingresspolicy2.jpg)

5. Confirm that the policy:

   - Uses the FortiGate WAN interface as the incoming interface.
   - Uses the interface associated with the spoke traffic path as the outgoing interface.
   - Uses the two virtual IP objects as destinations.
   - Permits TCP traffic to the mapped services.
   - Has logging enabled.
   - Is enabled.

::: info
The virtual IP objects perform destination NAT from FortiGate TCP ports `8081` and `8082` to TCP port `80` on the internal web servers.
:::

## 5.5 Test the Published Web Services

1. In the Amazon EC2 console, locate the public IPv4 address of the FortiGate instance.

2. Open the following URL in a web browser to access the Spoke 1 web server:

   ```text
   http://<FORTIGATE_PUBLIC_IP>:8081
   ```

3. Replace `<FORTIGATE_PUBLIC_IP>` with the public IPv4 address of the FortiGate instance.

4. Confirm that the Spoke 1 web page is displayed.

   ![Access the Spoke 1 web server through FortiGate](/images/ingresstraffic1.jpg)

5. Open the following URL to access the Spoke 2 web server:

   ```text
   http://<FORTIGATE_PUBLIC_IP>:8082
   ```

6. Confirm that the Spoke 2 web page is displayed.

   ![Access the Spoke 2 web server through FortiGate](/images/ingresstraffic2.jpg)

::: warning
These tests use HTTP rather than HTTPS because the internal Ubuntu web servers listen on TCP port `80`.
:::

## 5.6 Verify the Ingress Traffic Logs

1. In the FortiGate GUI, go to:

   **Log & Report > Forward Traffic**

2. Locate the sessions for external TCP ports:

   ```text
   8081
   8082
   ```

3. Confirm that the ingress firewall policy processed and accepted the traffic.

4. Verify that the translated destination addresses correspond to:

   ```text
   10.1.0.100
   10.2.0.100
   ```

![FortiGate ingress traffic logs](/images/ingresslogs.jpg)

## Next Step

Continue to [Section 6: Resource Cleanup](/section-6-resource-cleanup).