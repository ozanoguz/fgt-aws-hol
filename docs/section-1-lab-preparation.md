# Section 1: Lab Preparation

## 1.1 Access the AWS Console

Log in to the AWS Management Console using the workshop access information.

[Access the AWS Management Console](https://174296440058.signin.aws.amazon.com/console)

[Access the Lab Credentials](https://docs.google.com/)

::: info
Use the student account assigned to you for this workshop.
:::

## 1.2 Create an SSH Key Pair

You need an SSH key pair to securely access the EC2 instances deployed in the spoke VPCs.

1. Confirm that the selected AWS Region is **Cape Town (`af-south-1`)**.

   ![Select the AWS Cape Town Region](/images/selectregion.jpg)

2. In the AWS Console search bar, enter **Key pairs**, and open **EC2 > Key pairs**.

   ![Search for EC2 key pairs](/images/selectkeypairs.jpg)

3. Select **Create key pair**.

4. Configure the key pair:

   | Setting | Value |
   |---|---|
   | Name | `Student01-key` or your assigned student ID |
   | Key pair type | RSA |
   | Private key file format | `.pem` |

   ![Create the EC2 key pair](/images/createkeypair.jpg)

5. Select **Create key pair**.

6. The `.pem` file downloads automatically. Store it securely.

::: danger Important
AWS does not allow the private key file to be downloaded again after creation.
:::

::: tip Windows
You can use Windows OpenSSH directly with the `.pem` file. PuTTY users may need to convert the `.pem` file to `.ppk` format.
:::

On macOS or Linux, restrict access to the private key:

```bash
chmod 400 Student01-key.pem
```

You will select this key pair during the CloudFormation deployment.

## Next Step

Continue to [Section 2: Deployment and Provisioning](/section-2-deployment).
