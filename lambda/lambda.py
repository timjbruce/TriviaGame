import json
import boto3
import os
import random

dynamoclient = boto3.client('dynamodb')

def lambda_handler(event, context):

#    print(event['httpMethod'])
#    print(event['queryStringParameters'])
    msg = {}
    questions = os.environ['Questions']

    if(event['httpMethod']=='GET'):
        #this is for getting the question on the screen - simple get at
        question = random.randint(1,int(questions))
        results = dynamoclient.get_item(TableName='Trivia',
            Key = {'QuestionID': { 'S': str(question) }},
            AttributesToGet=['QuestionID','Question','A','B','C','D']
            )
        msg = results['Item']
    elif(event['httpMethod']=='POST'):
        results = dynamoclient.get_item(TableName='Trivia',
            Key = {'QuestionID': { 'S': event['queryStringParameters']['qid'] }},
            AttributesToGet=['Answer','MoreInfo','A','B','C','D']
            )
        print(event['queryStringParameters']['answer'])
        if(results['Item']['Answer']['S']==event['queryStringParameters']['answer']):
            #got it right!!!
            msg = {'Response':'You got it right!', 'Additional' : results['Item']['MoreInfo']['S'] }
        else:
            print((results['Item'][results['Item']['Answer']['S']]['S']))
            msg = {'Response': 'Sorry!  The correct response was {} '.format(results['Item'][results['Item']['Answer']['S']]['S']), 'Additional' : results['Item']['MoreInfo']['S']}
        #print(msg)

    else:
        #bad type of request - should not have gotten through APIGW
        return { 'statusCode': 404, 'body' : json.dumps({'message':'not found'}) }

    return {
        "statusCode": 200,
        "body": json.dumps(msg),
        "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
             }
    }
