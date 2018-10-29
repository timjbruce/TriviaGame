import json
import boto3
import datetime
import uuid

def lambda_handler(event, context):

    timestring = datetime.datetime.timestamp
    print(event['body'])
    data = {}

    data['uuid'] = str(uuid.uuid4())
    data['timestamp'] = str(datetime.datetime.now())

    jsondoc = json.loads(event['body'])
    for item in jsondoc:
        if not jsondoc[item]=="":
            data[item] = jsondoc[item]

    print(data)

    dynresource = boto3.resource('dynamodb')
    dyntable = dynresource.Table('ccdtw-feedback')

    response = dyntable.put_item(Item=data)
    print(response)

    if(response['ResponseMetadata']['HTTPStatusCode']==200):
        #respond with OK message
        return {
            "statusCode": 200,
            "body": json.dumps('Successful'),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
             }
        }
    else:
        #respond with error message
        return {
            "statusCode": 200,
            "body": json.dumps('Unsuccessful'),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
             }
        }


    # TODO implement
    return {
        "statusCode": 200,
        "body": json.dumps('Hello from Lambda!'),
        "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
             }
    }
