# Auth


### Generating with docker

Note: In order to generate open api client with docker you need to have docker installed and running.

#### For Windows:
Type the folowing commands in powershell:
```
docker run --rm `
    -v ${PWD}:/local `
    openapitools/openapi-generator-cli generate `
    -i https://range-boby-test.fortresslab.org/range/v3/api-docs `
    -g typescript-angular `
    -o /local/src/generated/api-client `
    --additional-properties supportsES6=true
```