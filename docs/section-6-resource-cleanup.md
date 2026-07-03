# Section 6: Resource Cleanup

Delete the lab environment after completing the exercises to prevent unnecessary AWS charges and release the assigned FortiFlex entitlement.

::: danger Important
Do not leave the lab resources running after the workshop.

Complete the cleanup procedure using only the AWS account and FortiFlex token assigned to your Student ID.
:::

## 6.1 Delete the CloudFormation Stack

The CloudFormation stack should be deleted before manually removing individual AWS resources.

1. Log in to the AWS Management Console using your assigned student account.

2. Confirm that the selected AWS Region is **Frankfurt**:

   ```text
   eu-central-1
   ```

3. Open the AWS CloudFormation console.

4. Select **Stacks**.

5. Locate the stack created for your lab environment.

6. Select the stack.

7. Select **Delete**.

8. Confirm the deletion when prompted.

9. Open the **Events** tab and monitor the deletion process.

The stack status changes to:

```text
DELETE_IN_PROGRESS
```

Wait until the stack is removed from the active stack list or reaches:

```text
DELETE_COMPLETE
```

::: warning
Do not close the AWS Console immediately after starting the deletion.

The cleanup process may take several minutes because AWS must delete resources in dependency order.
:::

## 6.2 Troubleshoot a Failed Stack Deletion

If the stack status changes to:

```text
DELETE_FAILED
```

complete the following steps:

1. Select the failed stack.

2. Open the **Events** tab.

3. Locate the first resource with the `DELETE_FAILED` status.

4. Review the associated error message.

5. Identify and remove the dependency preventing deletion.

6. Return to the CloudFormation console.

7. Select the stack and retry the deletion.

Common causes of deletion failure include:

- A network interface is still attached to an EC2 instance.
- An Elastic IP address is still associated with a resource.
- A route table still contains a dependent route.
- A Transit Gateway attachment is still in use.
- A security group is still attached to a network interface.
- A resource was modified manually after the CloudFormation deployment.
- An EC2 instance has termination protection enabled.

::: danger
Do not manually delete multiple stack-managed resources unless CloudFormation reports that a specific dependency is preventing deletion.

Deleting resources in the wrong order may make the cleanup process more difficult.
:::

## 6.3 Verify That the EC2 Instances Were Removed

After the CloudFormation stack deletion completes:

1. Open the Amazon EC2 console.

2. Confirm that the selected Region is **Frankfurt (`eu-central-1`)**.

3. Select **Instances**.

4. Confirm that the following lab instances have been terminated:

   - FortiGate-VM
   - Spoke 1 Ubuntu VM
   - Spoke 2 Ubuntu VM

Terminated instances may remain visible in the EC2 console for a short time.

::: info
A terminated instance may still appear in the console temporarily, but its state must be:

```text
Terminated
```
:::

## 6.4 Verify That the Network Resources Were Removed

Open the Amazon VPC console and verify that the following lab resources were deleted:

- FortiGate security hub VPC
- Spoke 1 VPC
- Spoke 2 VPC
- Public and private subnets created by the stack
- Internet gateways created by the stack
- NAT gateways, if applicable
- Route tables created by the stack
- Security groups created by the stack
- Network interfaces created by the stack
- AWS Transit Gateway
- Transit Gateway attachments
- Transit Gateway route tables created by the stack

::: warning
Do not delete default VPC resources or resources belonging to another student environment.
:::

## 6.5 Verify That Public IP Resources Were Released

1. In the Amazon EC2 console, go to:

   **Network & Security > Elastic IP addresses**

2. Confirm that no Elastic IP addresses created by the lab remain allocated.

3. If an unused lab Elastic IP remains:

   - Select the Elastic IP address.
   - Select **Actions > Release Elastic IP addresses**.
   - Confirm the release.

::: warning
Release only the Elastic IP address created for your lab environment.

An allocated but unused Elastic IP address may continue to incur AWS charges.
:::

## 6.6 Delete the SSH Key Pair

The SSH key pair created manually in Section 1 is not normally managed by the CloudFormation stack.

1. In the Amazon EC2 console, go to:

   **Network & Security > Key pairs**

2. Locate the key pair created for this lab.

   Example:

   ```text
   Student01-key
   ```

3. Select the key pair.

4. Select **Actions > Delete**.

5. Confirm the deletion.

6. Delete the downloaded private key file from your computer when it is no longer required.

   Example:

   ```text
   Student01-key.pem
   ```

::: warning
Do not delete an SSH key pair that is used by another environment.
:::

## 6.7 Verify the FortiFlex Entitlement

After the FortiGate instance has been deleted, verify the status of the FortiFlex entitlement used for the lab.

Follow the workshop procedure to:

- Stop or deactivate the entitlement, if required.
- Return the entitlement to the available pool, if required.
- Confirm that the FortiGate serial number is no longer actively consuming the entitlement.

::: info
The exact FortiFlex cleanup process depends on how the workshop tokens and entitlements were created.

If entitlement cleanup is managed centrally by the instructor, no student action is required.
:::

::: danger
Do not modify or deactivate a FortiFlex entitlement assigned to another Student ID.
:::

## 6.8 Final Cleanup Verification

Before completing the lab, confirm that:

- The CloudFormation stack has been deleted.
- All FortiGate and Ubuntu EC2 instances are terminated.
- The lab VPCs have been deleted.
- The AWS Transit Gateway and its attachments have been deleted.
- No lab Elastic IP addresses remain allocated.
- No lab-created network interfaces remain.
- The lab SSH key pair has been deleted.
- The local `.pem` file has been removed when no longer required.
- The FortiFlex entitlement has been released or marked for instructor-managed cleanup.

## Lab Complete

You have completed the FortiGate-VM Hub-and-Spoke lab on AWS and removed the associated lab resources.