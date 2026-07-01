# Section 6: Resource Cleanup

Delete the lab environment after completing the exercises to prevent unnecessary AWS charges.

## 6.1 Delete the CloudFormation Stack

1. Open the AWS CloudFormation console.

2. Select the stack created for your student account.

3. Select **Delete**.

4. Confirm the deletion.

5. Wait until the stack is removed from the active stack list or reaches:

   ```text
   DELETE_COMPLETE
   ```

::: danger Important
Deleting the CloudFormation stack permanently removes the resources created by the template.
:::

## 6.2 Verify Resource Removal

Confirm that the following lab resources have been removed:

- FortiGate EC2 instance
- Spoke EC2 instances
- Security and spoke VPCs
- AWS Transit Gateway and attachments
- Route tables created by the stack
- Network interfaces and public IP addresses created by the stack

::: warning
The EC2 key pair created manually in Section 1 is not normally deleted by the CloudFormation stack. Delete it manually when it is no longer required.
:::

## Lab Complete

You have completed the FortiGate-VM Hub-and-Spoke lab on AWS.
