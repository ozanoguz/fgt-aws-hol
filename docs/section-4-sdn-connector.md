# Section 4: FortiGate AWS SDN Connector

## 4.1 AWS SDN Connector Overview

The FortiGate AWS SDN connector integrates FortiGate with AWS and retrieves dynamic cloud attributes such as:

- EC2 instance IDs
- Private and public IP addresses
- AWS resource tags
- Subnet IDs
- VPC IDs
- Security groups

These dynamic attributes can be used in FortiGate address objects and firewall policies. This reduces manual configuration and allows security policies to adapt to changes in the AWS environment.

## 4.2 Configure the AWS SDN Connector

1. In the FortiGate GUI, go to **Security Fabric > External Connectors**.

2. Select **Create New**, and choose **Amazon Web Services (AWS)**.

   ![Create an AWS external connector](/images/fgtsdn1.jpg)

3. Configure the connector as shown in the lab screenshot.

4. Enable:

   - **Use metadata IAM**
   - **Alternative resources**

   ![Configure the FortiGate AWS SDN connector](/images/fgtsdn2.jpg)

5. Save the connector configuration.

6. Right-click the AWS connector and select **View Connector Objects**.

   ![Open AWS connector objects](/images/fgtsdn3.jpg)

7. Confirm that the FortiGate retrieved AWS objects and attributes, including instance IDs, tag keys, subnet IDs, and VPC IDs.

   ![AWS resources discovered by the SDN connector](/images/fgtsdn4.jpg)

::: info
The CloudFormation deployment assigns an IAM role to the FortiGate instance. The **Use metadata IAM** option allows FortiGate to use that instance role instead of manually configured AWS access keys.
:::

## Next Step

Continue to [Section 5: Traffic Inspection](/section-5-traffic-inspection).
