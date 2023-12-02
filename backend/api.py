import firebase_admin
import openai
import time
from firebase_admin import firestore, credentials, auth
from operator import itemgetter
from flask import Flask, request
from functools import wraps


###########################################################
# APP INITIALIZATION
###########################################################

# Open API Key
openai.api_key = ""
# Initialize Flask App
app = Flask(__name__)
# Initialize firebase db
cred = credentials.Certificate("fbKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
emails_ref = db.collection('emails')

# USERS
page = auth.list_users()

global writer

###########################################################
# GENERAL HELPER FUNCTIONS
###########################################################
def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('authorization'):
            return {'message': 'No token provided'},400
        try:
            user = auth.verify_id_token(request.headers['authorization'])
            request.user = user
        except:
            return {'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap

###########################################################
# GPT FUNCTIONS
###########################################################
def log_prompt(prompt):
  print("--------------------------------------------------------------------")
  print("GPT prompt: " + prompt)
  print("--------------------------------------------------------------------")

def log_response(response):
  print("--------------------------------------------------------------------")
  print("GPT response: " + response)
  print("--------------------------------------------------------------------")

'''
This class is a companion class to the EmailWriter class but was left separate
during development. Email class just serves as a data class with related 
functions. 
'''
class Email():
  def __init__(self, form_data):
    self.subject = form_data["subject"]
    self.recipient_name = form_data["recipientName"]
    self.recipient_email = form_data["recipientEmail"]
    self.recipient_relationship = form_data["recipientRelationship"]
    self.content = form_data["content"]
    self.body = form_data["body"]
    self.body_drafts = form_data["bodyDrafts"]
    self.sender_name = form_data["senderName"]
    self.sender_email = form_data["senderEmail"]
    self.tone = form_data["tone"]
  
  def to_dict(self) -> dict:
    return {
        "sender": self.sender_name,
        "tone": self.tone,
        "content"   : self.content,
        "senderName": self.sender_name,
        "senderEmail": self.sender_email,
        "recipientName": self.recipient_name,
        "recipientEmail": self.recipient_email,
        "recipientRelationship": self.recipient_relationship,
        "content": self.content,
        "subject": self.subject,
        "body": self.body, 
        "bodyDrafts": [],
    }

  def print_email(self):
    formatted_email = f"""
    From: {self.sender_name} - {self.sender_email}
    Subject: {self.subject}
    To: {self.recipient_name} - {self.recipient_email}
    cc: {[]}
    _____________________________________________________________________
    
    {self.body}

    """
    print(formatted_email)


'''
This class is dedicated to building an Email Object by prompting the user with
appropriate input intervals to collect the necessary information for the GPT
prompts for the Email.
'''
class EmailWriter():
  def __init__(self, email):
    self.email = email
    self.contents = None
    self.form = None

  # Method for writing the email
  def write_email(self):

    prompt = f"Generate a lengthy email with the following attributes {self.email.to_dict()}"
    completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
    result = completion.choices[0].text.strip()
    self.email.body = result
    self.email.body_drafts.append(result)
    
    log_prompt(prompt)
    log_response(result)
    
    
    #Print Finalized Email
    self.email.print_email()
  
  #Rewrites the email depending on user inputs
  def rewrite_email(self, desired_change):
    print("How can we make the email better?")

    prompt = f"Can you rewrite the following email but {desired_change} \n {self.email.body}\n\n"
    completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
    result = completion.choices[0].text.strip()

    self.email.body = result
    self.email.body_drafts.append(result)

    log_prompt(prompt)
    log_response(result)

    #Print Finalized Email
    self.email.print_email()
  
  # Use Gpt to generate a subject line
  def get_subject_line(self):
    print("Let's have GPT generate a Subject Line")
    prompt = f"Can you generate a subject line for the following email \n {self.email.body}\n\n"
    completion = openai.Completion.create(engine="text-davinci-002", max_tokens=256, prompt=prompt)
    result = completion.choices[0].text.strip()
    log_prompt(prompt)
    log_response(result)
    self.email.subject = result

###########################################################
# API ROUTES
###########################################################

@app.route('/gpt/write', methods=['POST'])
@check_token
def writeBody():
    id, form_data = itemgetter('id', 'formData')(request.get_json())
    print(request.get_json())
    email = Email(form_data)
    writer = EmailWriter(email)
    writer.write_email()

    written_email = writer.email.to_dict()
    return { **written_email }

@app.route('/gpt/rewrite', methods=['POST'])
@check_token
def rewriteBody():
    id, form_data, desired_change = itemgetter('id', 'formData', 'desiredChange')(request.get_json())
    print(request.get_json())
    print(desired_change)
    email = Email(form_data)
    writer = EmailWriter(email)
    writer.rewrite_email(desired_change)

    written_email = writer.email.to_dict()
    return { **written_email }

@app.route('/gpt/subject', methods=['GET'])
@check_token
def subjectLine():
    return

@app.route('/gpt/edit', methods=['POST', 'GET'])
@check_token
def update():
    return

@app.route('/gpt/delete', methods=['POST'])
def delete():
    return

@app.route('/gpt/save', methods=['POST'])
def save():
    email = itemgetter('email')(request.get_json())
    new_email_ref = emails_ref.document()
    new_email_ref.set(email)
    print(new_email_ref.id)
    return {'id': new_email_ref.id}

@app.route('/gpt/time', methods=['POST', 'GET'])
@check_token
def get_time():
    uid = itemgetter('id')(request.get_json())
    print(uid)
    user = auth.get_user(uid)
    print('Successfully fetched user data: {0}'.format(user.uid))
    return {'time': time.time() }

if __name__ == "__main__":
    app.run(debug=True)
