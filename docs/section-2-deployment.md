# Section 2: Deployment and Provisioning

## 2.1 Subscribe to the FortiGate BYOL AMI

Before deploying the CloudFormation stack, subscribe to the FortiGate BYOL AMI in AWS Marketplace.

1. Open the [FortiGate BYOL Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-wory773oau6wq).

2. Select **View purchase options**.

   ![FortiGate BYOL Marketplace purchase options](/images/amipurchaseoptions.jpg)

3. Select **Subscribe** at the bottom of the page.

   ![Subscribe to the FortiGate BYOL AMI](/images/amisubscribe.jpg)

4. The **Subscribe** button may remain unavailable for several minutes while AWS processes the request.

   ![FortiGate AMI subscription processing](/images/amisubscribe1.jpg)

5. Wait until AWS confirms that the subscription is complete.

   ![FortiGate AMI subscription completed](/images/amisubscribe2.jpg)

## 2.2 Deploy the Lab Environment

1. Log in to the AWS Management Console.

2. Launch the CloudFormation template provided for the workshop.

   [![Launch Stack](/images/launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://ftnt-cfts.s3.amazonaws.com/training/Cape_Town_HoL_CFT.yaml&stackName=FortiGate-Hub-and-Spoke-Lab)

   The button opens the AWS CloudFormation console in the Frankfurt Region and loads the workshop template automatically.

3. Confirm that the AWS Frankfurt Region is selected:

   ```text
   eu-central-1
   ```

4. Configure the stack parameters:

   | Parameter | Value |
   |---|---|
   | Stack name | Your student ID, for example `Student01` |
   | KeyPair | The SSH key created in Section 1.2 |
   | ClientIP | Your public IP address in CIDR format, for example `203.0.113.10/32` |
   | LicenseType | `BYOL` |

   ::: tip
   You can use a public IP lookup service to identify your current public IP address. Append `/32` so that only your current IP address is allowed.
   :::

   ![CloudFormation deployment parameters](/images/cft1.jpg)

   ![CloudFormation key pair parameter](/images/cft2.jpg)

   ![CloudFormation client IP parameter](/images/cft3.jpg)

   ![CloudFormation deployment confirmation](/images/cft4.jpg)

5. Select **Next** through the remaining CloudFormation pages.

6. Review the configuration and select **Create stack**.

## 2.3 Access the Deployed Resources

Wait until the CloudFormation stack status changes to:

```text
CREATE_COMPLETE
```

![CloudFormation stack deployment completed](/images/cftcomplete.jpg)

Open the Amazon EC2 console and locate the FortiGate instance.

Use the following initial credentials:

| Field | Value |
|---|---|
| Username | `admin` |
| Initial password | FortiGate EC2 instance ID |

Example instance ID:

```text
i-0a1b2c3d4e5f6g7h8
```

::: warning
The FortiGate GUI may take several minutes to become available after the CloudFormation stack reaches `CREATE_COMPLETE`.
:::

## Next Step

Continue to [Section 3: FortiGate Preparation](/section-3-fortigate-preparation).
