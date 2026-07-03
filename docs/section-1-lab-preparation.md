# Section 1: Lab Preparation

## 1.1 Retrieve Your Lab Credentials

Open the [Lab Credential Portal](https://oe4inoootpmwha6h46gxljxlvu0aclyr.lambda-url.eu-central-1.on.aws/).

Enter:

- The shared **Lab access key** provided by the instructor
- Your assigned **Student ID**, for example `student01`

Select **Show my credentials**.

The portal displays only the credential record assigned to your Student ID.

Keep the credential page open during the lab. You will use the following values:

| Credential | Used for |
|---|---|
| AWS account ID | AWS Console sign-in |
| IAM username | AWS Console sign-in |
| AWS Console password | AWS Console sign-in |
| AWS access key ID | AWS CLI or API authentication |
| AWS secret access key | AWS CLI or API authentication |

::: danger Important
Use only the credentials assigned to your Student ID.

Do not share, photograph, copy to an unsecured location, or reuse these credentials outside this lab.
:::

::: tip
Use the **Copy** button beside a credential when available to avoid typing errors.
:::

## 1.2 Access the AWS Console

Open the AWS Management Console:

[Access the AWS Management Console](https://174296440058.signin.aws.amazon.com/console)

Log in using the values displayed in the credential portal:

| AWS sign-in field | Credential portal value |
|---|---|
| Account ID | AWS account ID |
| IAM user name | IAM username |
| Password | AWS Console password |

::: info
Use only the student account assigned to you for this workshop.
:::

After signing in, confirm that the selected AWS Region is **Frankfurt (`eu-central-1`)**.

![Select the AWS Cape Town Region](/images/selectregion.jpg)

## 1.3 Create an SSH Key Pair

You need an SSH key pair to securely access the EC2 instances deployed in the spoke VPCs.

1. In the AWS Console search bar, enter **Key pairs**, and open **EC2 > Key pairs**.

   ![Search for EC2 key pairs](/images/selectkeypairs.jpg)

2. Select **Create key pair**.

3. Configure the key pair:

   | Setting | Value |
   |---|---|
   | Name | Your Student ID followed by `-key`, for example `student01-key` |
   | Key pair type | RSA |
   | Private key file format | `.pem` |

   ![Create the EC2 key pair](/images/createkeypair.jpg)

4. Select **Create key pair**.

5. The `.pem` file downloads automatically. Store it securely.

::: danger Important
AWS does not allow the private key file to be downloaded again after creation.
:::

::: tip Windows
You can use Windows OpenSSH directly with the `.pem` file. PuTTY users may need to convert the `.pem` file to `.ppk` format.
:::

On macOS or Linux, restrict access to the private key:

```bash
chmod 400 student01-key.pem