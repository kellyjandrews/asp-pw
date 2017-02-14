ASP Password for Node
=====================

[![Codeship Status for kellyjandrews/asp-pw](https://app.codeship.com/projects/a87a5a70-bbe8-0134-af05-325dab4154b9/status?branch=master)](https://app.codeship.com/projects/195777)
[![Jest Code Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen.svg)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Currently only works for compatibility version 2 of the ASP.NET  identity framework.

## Example Usage

### Password Hashing

```javascript
import password from 'asp-pw';

const hashedPassword = password.hash('MySecurePassword');
console.log(hashedPassword); //  Prints Base64 encoded string
```

### Password Validation

```javascript
import password from 'asp-pw';

// Get the original hash from your data provider.
const hashedPassword = '...';
const valid= password.validate('MySecurePassword', storedHash);
console.log(valid); // Prints true or false
```
