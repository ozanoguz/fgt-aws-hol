# FortiGate-VM Hub-and-Spoke Lab: AWS Transit Gateway

## Overview

This hands-on lab demonstrates how to protect distributed AWS workloads using a centralized security hub architecture.

You will deploy a FortiGate-VM to inspect:

- Egress traffic from workload VPCs to the Internet
- East-west traffic between workload VPCs
- Ingress traffic from the Internet to published workload services

AWS Transit Gateway provides connectivity between the FortiGate security hub and the workload VPCs.

::: warning Disclaimer
This environment is intended only for hands-on workshops and demonstrations. Do not use it in production without an appropriate security review, architecture validation, and additional hardening.
:::

## Lab Credentials

Each student is assigned an individual set of temporary AWS credentials.

Before starting the lab:

1. Open the [Lab Credential Portal](https://oe4inoootpmwha6h46gxljxlvu0aclyr.lambda-url.eu-central-1.on.aws/).
2. Enter the shared **lab access key** provided for the workshop.
3. Enter your assigned **Student ID**, for example `student01`.
4. Select **Show my credentials**.
5. Keep the credential page open during the lab.

The portal displays only the credentials assigned to the submitted Student ID.

The credential set includes:

- AWS account ID
- IAM username
- AWS Console password
- AWS access key ID
- AWS secret access key

::: danger Important
Use only the credentials assigned to your Student ID.

Do not share, photograph, store in an unsecured location, or reuse these credentials outside this lab.
:::

::: info
The credentials are temporary and may stop working after the workshop access period ends.
:::

## Lab Architecture

The CloudFormation template automates the deployment of the following components:

- **Central security hub:** A VPC containing the FortiGate-VM inspection point.
- **AWS Transit Gateway:** The cloud router connecting the security hub and workload VPCs.
- **Workload spokes:** Two separate VPCs containing Ubuntu web servers.
- **Centralized traffic flow:** Egress and east-west traffic from the spoke instances is routed through AWS Transit Gateway to the FortiGate private interface for security inspection.

## Lab Diagram

![AWS FortiGate Hub-and-Spoke lab topology](/images/AWS_HoL_Topology.jpg)

## Lab Sections

1. Retrieve your lab credentials, access AWS, and create an SSH key pair.
2. Subscribe to the FortiGate BYOL AMI and deploy the lab environment.
3. Log in to, license, and verify the FortiGate-VM.
4. Configure the FortiGate AWS SDN Connector.
5. Test egress, east-west, and ingress traffic inspection.
6. Delete the lab resources.

## AWS Region

Complete all exercises in the AWS Frankfurt Region:

```text
eu-central-1
```

::: warning Region consistency
Resources created in another AWS Region will not appear in the Frankfurt consoles used throughout this guide.
:::

## Next Step

Continue to [Section 1: Lab Preparation](/section-1-lab-preparation).