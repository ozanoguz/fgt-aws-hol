# FortiGate-VM Hub-and-Spoke Lab: AWS Transit Gateway

## Overview

This hands-on lab demonstrates how to protect distributed AWS workloads using a centralized security hub architecture.

You will deploy a FortiGate-VM to inspect:

- North-south Internet traffic
- East-west traffic between workload VPCs
- Inbound traffic from the Internet

AWS Transit Gateway provides connectivity between the FortiGate security hub and the workload VPCs.

::: warning Disclaimer
This environment is prepared specifically for hands-on workshop purposes. Do not use it in production without additional security review and hardening.
:::

## Lab Architecture

The CloudFormation template automates the deployment of the following components:

- **Central Security Hub:** A VPC containing the FortiGate-VM inspection point.
- **AWS Transit Gateway:** The cloud router connecting the security and workload VPCs.
- **Workload Spokes:** Two separate VPCs running Ubuntu web servers.
- **Centralized traffic flow:** Egress and east-west traffic from the spoke instances is routed through the Transit Gateway to the FortiGate private interface for security inspection.

## Lab Diagram

![AWS FortiGate Hub-and-Spoke lab topology](/images/AWS_HoL_Topology.jpg)

## Lab Sections

1. Prepare the AWS environment and create an SSH key pair.
2. Subscribe to the FortiGate BYOL AMI and deploy the lab.
3. Log in to, license, and verify the FortiGate-VM.
4. Configure the FortiGate AWS SDN connector.
5. Test egress, east-west, and ingress traffic inspection.
6. Delete the lab resources.

## AWS Region

The lab is deployed in the AWS Cape Town Region:

```text
af-south-1
```

## Start the Lab

Continue to [Section 1: Lab Preparation](/section-1-lab-preparation).
