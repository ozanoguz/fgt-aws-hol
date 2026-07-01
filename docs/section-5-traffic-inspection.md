# Section 5: Traffic Inspection

## 5.1 Test Spoke-to-Internet Connectivity

In this test, traffic flows from a spoke VPC through the AWS Transit Gateway and FortiGate to the Internet.

1. In the Amazon EC2 console, locate the public IP address of `Spoke1-VM`.

   ![Locate the Spoke 1 VM public IP address](/images/spokevm1eip.jpg)

2. Connect to the instance using the SSH key created earlier.

   ```bash
   ssh -i Student01-key.pem ubuntu@<SPOKE1-PUBLIC-IP>
   ```

   The Ubuntu username is:

   ```text
   ubuntu
   ```

3. Test Internet connectivity through the FortiGate:

   ```bash
   ping -c 4 8.8.8.8
   ```

4. Test TCP connectivity to the Fortinet website:

   ```bash
   telnet www.fortinet.com 443
   ```

   Alternatively, use `curl`:

   ```bash
   curl -I https://www.fortinet.com
   ```

::: info
The instances use a wait-for-FortiGate script. Their setup completes only after they can successfully reach the Internet through the FortiGate.
:::

![Spoke VM egress connectivity test](/images/egresstest.jpg)

5. In the FortiGate GUI, go to **Log & Report > Forward Traffic**.

6. Locate traffic from source networks beginning with:

   ```text
   10.1.x.x
   10.2.x.x
   ```

7. Confirm that the preconfigured egress Internet access policy processed the traffic.

   ![FortiGate egress traffic logs](/images/egresslog.jpg)

## 5.2 Test Spoke-to-Spoke Connectivity

In this test, traffic flows from Spoke 1 to Spoke 2 through the Transit Gateway and FortiGate.

1. In the FortiGate GUI, create a firewall policy that permits east-west traffic between the spoke networks.

   ![Create the east-west firewall policy](/images/eastwest1.jpg)

   ![Configure the east-west firewall policy](/images/eastwest2.jpg)

2. From the Spoke 1 instance, initiate ICMP traffic to the Spoke 2 instance:

   ```bash
   ping -c 4 10.2.0.100
   ```

3. Test HTTP connectivity to the Spoke 2 web server:

   ```bash
   curl http://10.2.0.100
   ```

   ![Test traffic from Spoke 1 to Spoke 2](/images/eastwest3.jpg)

4. In the FortiGate GUI, go to **Log & Report > Forward Traffic**.

5. Confirm that the east-west policy processed the traffic.

   ![FortiGate east-west traffic logs](/images/eastwest4.jpg)

## 5.3 Test Internet-to-Spoke Connectivity

In this test, FortiGate virtual IP objects publish the spoke web servers to the Internet.

### Create Virtual IP Objects

Create two virtual IP objects:

| Spoke | External TCP port | Internal web server |
|---|---:|---|
| Spoke 1 | `8081` | `10.1.0.100:80` |
| Spoke 2 | `8082` | `10.2.0.100:80` |

1. Create the virtual IP object for Spoke 1.

   ![Create the Spoke 1 virtual IP object](/images/vip1.jpg)

2. Create the virtual IP object for Spoke 2.

   ![Create the Spoke 2 virtual IP object](/images/vip2.jpg)

### Create the Ingress Firewall Policy

3. Create a firewall policy that permits inbound HTTP traffic from the WAN interface to the two virtual IP objects.

   ![Create the ingress firewall policy](/images/ingresspolicy1.jpg)

   ![Configure the ingress firewall policy](/images/ingresspolicy2.jpg)

### Test Published Web Services

4. Open the following URLs in a web browser:

   ```text
   http://<FORTIGATE-PUBLIC-IP>:8081
   ```

   ```text
   http://<FORTIGATE-PUBLIC-IP>:8082
   ```

   ![Access the Spoke 1 web server through FortiGate](/images/ingresstraffic1.jpg)

   ![Access the Spoke 2 web server through FortiGate](/images/ingresstraffic2.jpg)

5. In the FortiGate GUI, go to **Log & Report > Forward Traffic**.

6. Confirm that the ingress firewall policy processed the traffic.

   ![FortiGate ingress traffic logs](/images/ingresslogs.jpg)

## Next Step

Continue to [Section 6: Resource Cleanup](/section-6-resource-cleanup).
