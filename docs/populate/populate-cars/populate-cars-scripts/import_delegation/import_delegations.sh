#!/bin/bash

TABLE_NAME="Delegations"

jq -c '.[]' delegations.json | while read -r delegation; do

aws dynamodb put-item \
    --table-name "$TABLE_NAME" \
    --item "$(echo "$delegation" | jq '{
    "delegationId": {"S": .delegationId},
    "operation" : {"S": .operation},
    "name": {"S": .name},
    "city": {"S": .city},
    "adress": {"S": .adress},
    "telf": {"N": (.telf|tostring)},
    "carQuantity": {"N": (.carQuantity|tostring)},
    "manager": {"S": .manager},
    "long": {"N": (.long|tostring)},
    "lat": {"N": (.lat|tostring)}
    }')"
done
echo "Delegations imported successfully."
