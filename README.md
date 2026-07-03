# FortiGate-VM Hub-and-Spoke Lab: AWS Transit Gateway

This repository contains the VitePress source for the FortiGate-VM AWS Transit Gateway hands-on lab.

## Credential Portal

Each student retrieves an individual record from the lab credential portal by entering the shared lab access key and an assigned Student ID.

The CSV consumed by the portal must use this exact header order:

```csv
Student ID,Account ID,IAM Username,Console password,Access Key ID,Secret,FortiFlex Token,FortiGate Serial Number
```

The portal record contains:

- AWS account ID
- IAM username
- AWS Console password
- AWS access key ID
- AWS secret access key
- FortiFlex token
- FortiGate serial number

The FortiFlex token is used to activate the FortiGate-VM. The assigned FortiGate serial number is used to verify that the correct entitlement and appliance are being used.

## Lab Guide

The published guide is built from the Markdown files under `docs/`.

Start with:

- `docs/introduction.md`
- `docs/section-1-lab-preparation.md`
- `docs/section-3-fortigate-preparation.md`

## AWS Region

All lab resources are deployed in AWS Frankfurt:

```text
eu-central-1
```

## Security Notice

The credential CSV contains sensitive temporary credentials and licensing information. Do not commit the populated CSV to this public repository. Store it only in the protected S3 location used by the Lambda credential portal.
