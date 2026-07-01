# Section 3: FortiGate Preparation

## 3.1 Initial Login

1. In the Amazon EC2 console, locate the public IP address of the FortiGate instance.

2. Open the FortiGate GUI in your browser:

   ```text
   https://<FORTIGATE-PUBLIC-IP>
   ```

3. Log in with:

   | Field | Value |
   |---|---|
   | Username | `admin` |
   | Password | FortiGate EC2 instance ID |

4. Set a new administrator password when prompted.

   ![FortiGate initial password prompt](/images/fgtprompt.jpg)

5. Complete the initial setup wizard.

::: tip
Your browser may display a certificate warning because the FortiGate initially uses a self-signed certificate.
:::

## 3.2 Activate the FortiGate License

1. Obtain the FortiFlex token assigned to your lab environment.

2. In the FortiGate GUI, use the token-based licensing option to activate the FortiGate-VM.

   ![Activate FortiGate using a FortiFlex token](/images/flextoken.jpg)

3. Confirm the reboot when prompted.

   ![FortiGate reboot confirmation](/images/fgtreboot.jpg)

4. Allow several minutes for the FortiGate to restart.

5. Log in again and confirm that the FortiGate displays a valid serial number and licensed status.

   ![FortiGate licensed status](/images/fgtlicensevalid.jpg)

## 3.3 Verify Interfaces and Firewall Policy

Verify that the deployment automation mapped the FortiGate interfaces correctly:

| Interface | Purpose |
|---|---|
| `port1` | WAN interface connected to the public subnet |
| `port2` | LAN interface connected to the private subnet and Transit Gateway traffic path |

![FortiGate interface configuration](/images/fgtinterface.jpg)

Next, confirm that the firewall policy for Ubuntu VM Internet access is already configured.

![Preconfigured FortiGate egress firewall policy](/images/fgtexistingpolicy.jpg)

## Next Step

Continue to [Section 4: FortiGate AWS SDN Connector](/section-4-sdn-connector).
