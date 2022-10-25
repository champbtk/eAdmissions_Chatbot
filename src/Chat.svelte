<script>
	import {fade, fly} from 'svelte/transition';
	import Bubbles from './Bubbles.svelte';
	import {ai_answers, responses} from './Answers.js'

	let messages = [];
	let wait;
	let backTopic;

	let greeting_list = ["Account / Email", "Application", "Contact Us"];
	//Account Topic
	let account_list = ["Issues with my account", "Update my account details",  "Email issues", "My child is no longer appearing on my account"];
	let accountIssues_list = ["Recover my username and password", "Account no longer exist / not recognised", "Mobile already exist", "Account already exist"];
	let email_list = ["Not receiving any emails", "How to validate my email address?"];
	//Contact Topic
	let contact_list = ["Contact my Local Authority", "Contact the support desk"];
	//Application Topic
	let application_list = ["General information on applying", "In year application / school transfer", "Out of cohort (summer born)", "Waiting list", "Council tax", "Outcome information", "Issues with my application", "Making changes to my application"];
	let generalApply_list = ["When can I apply?", "Where or how do I apply?", "Apply on behalf of parents/carers", "Apply for more than 1 child", "How old must my child be to apply?", "Closing dates for application", "How to attach documents?", "Child's name changed by deed poll"];
	let issuesApplication_list = ["Child already exist", "Child's date of birth not accepted", "Cannot add sibling preferences","My address is not showing up", "Current school/nursery not listed", "School preferences not listed"];
	let changeApplication_list = ["Edit my child's details", "Edit my school preferences", "Change my address after submitting my application", "How to attach documents to my application"];
	
	//Check pressed key is the Enter key
	function pressEnter(e){
		if(e.key == 'Enter'){
            e.preventDefault();
			send();
        }
	}

	//Close Chatbox
	function closeChat(){
		let menu = document.getElementById('main');
		let open_icon = document.getElementById('open');
		
		menu.style.display = "none";
		open_icon.style.display = "block";
    }
	
	//Open Chatbox
	function openChat(){
		let menu = document.getElementById('main');
		let open_icon = document.getElementById('open');

		menu.style.display = "block";
		open_icon.style.display = "none";

		document.getElementById("input_message").focus();
		if(messages.length == 0){
			//Greeting
			response(responses[1], greeting_list);
		}
    }

	//Reading time calculation
	function readingTime(text) {
		const wps = (600 / 60);
		const words = text.trim().split(/\s+/).length;
		const time = Math.ceil((words / wps) * 500);
		if(text == responses[1]){
			return 500;
		}
		else if(time > 2000){
			return 2000;
		}
		else{
			return time;
		}
	}

	//Update chat to follow the scroll
	function updateScroll(){
		var element = document.getElementById("chatbox");
		element.scrollTop = element.scrollHeight;
	}

	//Send user input to the Chatbox
	function send(submitted_text){
		//If we submitted a text then use that text if not use what is in the textbox
		if(submitted_text){
			messages = [...messages, { text: submitted_text.text, who: "you" }]
			//Clearing and disabling the text field
			document.getElementById("input_message").value = "";
			document.getElementById("input_message").disabled = true;
			//Update scroll, enable Bubbles, update scroll again
			setTimeout(() => {
				updateScroll()
			}, 10)	
			setTimeout(() => {
				wait = true;
			}, 500)
			setTimeout(() => {
				updateScroll()
			}, 510)
		}
		//If using textbox
		else{
			var input = document.getElementById("input_message").value;
			if(input.trim().length == 0){

			}
			else{
				//Sending user input to array 
				messages = [...messages, { text: input, who: "you" }]
				//Clearing and disabling the text field
				document.getElementById("input_message").value = "";
				document.getElementById("input_message").disabled = true;
				//Update scroll, enable Bubbles, update scroll again
				setTimeout(() => {
					updateScroll()
				}, 10)	
				setTimeout(() => {
					wait = true;
				}, 500)
				setTimeout(() => {
					updateScroll()
				}, 510)
			}
		}
	}

	//Sending AI response to the Chatbox
	function ai_response(intent, entity, trait){
		let input;

		console.log(intent);
		console.log(entity);
		console.log(trait);

		//Check greeting and thank you
		if(typeof trait['wit$greetings'] !== 'undefined' && trait['wit$greetings'][0].value == 'true'){
			response(responses[1], greeting_list);
			return;
		}
		//Thank you
		else if(typeof trait['wit$thanks'] !== 'undefined' && trait['wit$thanks'][0].value == 'true'){
			input = "You are very welcome.";
		}
		else{
			//Checking if there is an intent in the query
			if(intent.length == 0){
				//If entity but no intent, they will need to be more specific
				if(entity.length != 0){
					input = "I'm sorry, I didn't understand that. Could you be more specific?";
				}
				else{
					input = "I'm sorry, I didn't understand the issue. Please try typing in something else.";
				}
			}
			//If intent and entity then check for known topics
			else{		
				//Recover username (recover - username)
				if(typeof entity['recovery:recovery'] !== 'undefined' && intent[0].name == "recover" && entity['recovery:recovery'][0].value == "username"){
					input = ai_answers[0];
				}
				//Recover password (recover - password)
				else if(typeof entity['recovery:recovery'] !== 'undefined' && intent[0].name == "recover" && entity['recovery:recovery'][0].value == "password"){
					input = ai_answers[1];
				}
				//Recover account (recover - account)
				else if(typeof entity['recovery:recovery'] !== 'undefined' && intent[0].name == "recover" && entity['recovery:recovery'][0].value == "account"){
					input = ai_answers[2];
				}
				//Child removed from my account (does_not_exist - child or multiple children)
				//MUST BE above "Account does not exist" to avoid overlaps
				else if(typeof entity['child:child'] !== 'undefined' && intent[0].name == ("does_not_exist") && (entity['child:child'][0].value == "multiple children" || entity['child:child'][0].value == "child")){
					input = ai_answers[33];
				}
				//Account does not exist (does_not_exist - account)
				else if(typeof entity['recovery:recovery'] !== 'undefined' && intent[0].name == "does_not_exist" && entity['recovery:recovery'][0].value == "account"){
					input = ai_answers[3];
				}
				//Email not received (not_receive - email)
				else if(typeof entity['email:email'] !== 'undefined' && intent[0].name == "not_receive" && entity['email:email'][0].value == "email"){
					input = ai_answers[4];
				}
				//Validate email (validate - email)
				else if(typeof entity['email:email'] !== 'undefined' && intent[0].name == ("validate") && entity['email:email'][0].value == "email"){
					input = ai_answers[5];
				}
				//Child already exist (already_exist - child)
				else if(typeof entity['child:child'] !== 'undefined' && intent[0].name == "already_exist" && entity['child:child'][0].value == "child"){
					input = ai_answers[6];
				}
				//Mobile already exist (already_exist - mobile)
				else if(typeof entity['mobile:mobile'] !== 'undefined' && intent[0].name == "already_exist" && entity['mobile:mobile'][0].value == "mobile"){
					input = ai_answers[7];
				}
				//Child DOB not recognised (is_incorrect - date of birth)
				else if(typeof entity['dob:dob'] !== 'undefined' && intent[0].name == "is_incorrect" && entity['dob:dob'][0].value == "date of birth"){
					input = ai_answers[8];
				}
				//Out of cohort (apply - out of cohort)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == "apply" && entity['app:app'][0].value == "out of cohort"){
					input = ai_answers[9];
				}
				//In year application (apply - in year application)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == "apply" && entity['app:app'][0].value == "in year application"){
					input = ai_answers[10];
				}
				//Change address after submitting an application (change - address)
				else if(typeof entity['address:address'] !== 'undefined' && intent[0].name == "change"  && entity['address:address'][0].value == "address"){
					input = ai_answers[11]; 
				}
				//Address not showing in dropdown list (does_not_exist - address)
				else if(typeof entity['address:address'] !== 'undefined' && intent[0].name == "does_not_exist" && entity['address:address'][0].value == "address"){
					input = ai_answers[12]; 
				}
				//Council tax number (change - council tax)
				else if(typeof entity['council_tax:council_tax'] !== 'undefined' && intent[0].name == "change" && entity['council_tax:council_tax'][0].value == "council tax"){
					input = ai_answers[13];
				}
				//Apply for more than one child (apply - multiple children and more than one child)
				else if(typeof entity['child:child'] !== 'undefined' && intent[0].name == ("apply") && (entity['child:child'][0].value == "multiple children" || entity['child:child'][0].value == "more than one child")){
					input = ai_answers[14];
				}
				//How to edit perferences (change - preference)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == "change"  && entity['app:app'][0].value == "preference"){
					input = ai_answers[15];
				}
				//How to view waiting list (view - waiting list)
				else if(typeof entity['list:list'] !== 'undefined' && intent[0].name == ("view") && entity['list:list'][0].value == "waiting list"){
					input = ai_answers[16];
				}
				//How to apply on behalf of students (apply - behalf)
				else if(typeof entity['behalf:behalf'] !== 'undefined' && intent[0].name == ("apply") && entity['behalf:behalf'][0].value == "behalf"){
					input = ai_answers[17];
				}
				//How to attaching documents (attach - document)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == ("attach") && entity['app:app'][0].value == "document"){
					input = ai_answers[18];
				}
				//How old must my child be to apply (apply - date of birth)
				else if(typeof entity['child:child'] !== 'undefined' && typeof entity['dob:dob'] !== 'undefined' && intent[0].name == ("apply") && entity['dob:dob'][0].value == "date of birth"){
					input = ai_answers[19];
				}
				//Current school/nusery is not listed (does_not_exist - current school)
				else if(typeof entity['list:list'] !== 'undefined' && intent[0].name == ("does_not_exist") && entity['list:list'][0].value == "current school"){
					input = ai_answers[20];
				}
				//View outcome information (view - outcome)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == ("view") && entity['app:app'][0].value == "outcome"){
					input = ai_answers[21];
				}
				//When can I apply (apply - when)
				else if(typeof entity['query:query'] !== 'undefined' && intent[0].name == ("apply") && entity['query:query'][0].value == "when"){
					input = ai_answers[22];
				}
				//View closing dates for application (view - closing)
				else if(typeof entity['date:date'] !== 'undefined' && intent[0].name == ("view") && entity['date:date'][0].value == "closing"){
					input = ai_answers[23];
				}
				//Where do I apply/start? (apply - where or how)
				else if(typeof entity['query:query'] !== 'undefined' && intent[0].name == ("apply") && (entity['query:query'][0].value == "where" || entity['query:query'][0].value == "how")){
					input = ai_answers[24];
				}
				//Apply for school (apply - preference)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == ("apply") && entity['app:app'][0].value == "preference"){
					input = ai_answers[24];
				}
				//Change my child detail (change - detail and (child or multiple children) )
				else if(typeof entity['app:app'] !== 'undefined' && typeof entity['child:child'] !== 'undefined' && intent[0].name == ("change") && (entity['app:app'][0].value == "detail" && (entity['child:child'][0].value == "child" || entity['child:child'][0].value == "multiple children"))){
					input = ai_answers[25];
				}
				//Change my detail (change - my detail)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == ("change") && entity['app:app'][0].value == "my detail"){
					input = ai_answers[26];
				}
				//Change email address (change - email)
				else if(typeof entity['email:email'] !== 'undefined' && intent[0].name == "change" && entity['email:email'][0].value == "email"){
					input = ai_answers[26];
				}
				//Account already exist (already_exist - username or account)
				else if(typeof entity['recovery:recovery'] !== 'undefined' && intent[0].name == ("already_exist") && (entity['recovery:recovery'][0].value == "account" || entity['recovery:recovery'][0].value == "username")){
					input = ai_answers[27];
				}
				//View local authority details (view - LA)
				else if(typeof entity['contact:contact'] !== 'undefined' && intent[0].name == ("view") && entity['contact:contact'][0].value == "LA"){
					input = ai_answers[28];
				}
				//View support desk details (view - support)
				else if(typeof entity['contact:contact'] !== 'undefined' && intent[0].name == ("view") && entity['contact:contact'][0].value == "support"){
					input = ai_answers[29];
				}
				//School Preference is not listed (does_not_exist - preference)
				else if(typeof entity['app:app'] !== 'undefined' && intent[0].name == ("does_not_exist") && entity['app:app'][0].value == "preference"){
					input = ai_answers[30];
				}
				//Cannot add sibling preference (is_incorrect - sibling)
				else if(typeof entity['child:child'] !== 'undefined' && intent[0].name == ("is_incorrect") && entity['child:child'][0].value == "sibling"){
					input = ai_answers[31];
				}
				//Deed poll name (attach - deed poll)
				else if(typeof entity['name:name'] !== 'undefined' && intent[0].name == ("attach") && entity['name:name'][0].value == "deed poll"){
					input = ai_answers[32];
				}
				else{
					input = "I'm sorry, I didn't understand the issue. Please try typing in something else.";
				}
			}
		}

		//Calculate reading time
		var time = readingTime(input);

		//Disable Bubbles, send our response then update scroll
		setTimeout(() => {
			wait = false
		}, time - 200);
		setTimeout(() => {
			messages = [...messages, { text: input, who: "them" }]
		}, time);
		setTimeout(() => {
			updateScroll()
			document.getElementById("input_message").focus()
		}, time + 10)
	}

	//Sending our response to the Chatbox
	function response(input, list){
		//Calculate reading time
		var time = readingTime(input);
		//Disable Bubbles, send our response then update scroll
		setTimeout(() => {
			wait = false
		}, time - 200);

		setTimeout(() => {
			messages = [...messages, { text: input, who: "them" }]
			//If opinion list is needed
			if(list){
				list.forEach(item => messages = [...messages, { text: item, who: "opinion" }])
			}
			//Have a back option
			if(list != greeting_list){
				messages = [...messages, { text: "Go back", who: "back" }]
			}
		}, time);

		setTimeout(() => {
			updateScroll()
			document.getElementById("input_message").focus()
		}, time + 10)
	}

	//true when user is waiting for response, we look for response then if there are no predefined one then go to AI
	$: if(wait == true){
		let input = messages[messages.length - 1].text.trim().toLowerCase();
		//Go through our pre-defined topics before AI and setting up a backTopic as well
		if(input == "glossary"){
			response(responses[0]);
			backTopic = "I would like to start over.";
		}
		else if(input == "start over" || input == "i would like to start over."){
			response(responses[1], greeting_list);
		}
		//Account Topic
		else if(input == "account / email"){
			response("Are you having issues with your account or are you looking to update some details?", account_list )
			backTopic = "I would like to start over.";
		}	
			else if(input == "issues with my account"){
				response("What issues are you having with your account?", accountIssues_list);
				backTopic = "Account / Email";
			}	
				else if(input == "recover my username and password"){
					response(ai_answers[2]);
					backTopic = "Issues with my account";
				}
				else if(input == "account no longer exist / not recognised"){
					response(ai_answers[3]);
					backTopic = "Issues with my account";
				}
				else if(input == "mobile already exist"){
					response(ai_answers[7]);
					backTopic = "Issues with my account";
				}
				else if(input == "account already exist"){
					response(ai_answers[27]);
					backTopic = "Issues with my account";
				}
			else if(input == "update my account details"){
				response(ai_answers[26]);
				backTopic = "Account / Email";
			}
			else if(input == "email issues"){
				response("What issues are you having with your email address?", email_list)
				backTopic = "Account / Email";
			}
				else if(input == "not receiving any emails"){
					response(ai_answers[4]);
					backTopic = "Email issues";
				}
				else if(input == "how to validate my email address?"){
					response(ai_answers[5]);
					backTopic = "Email issues";
				}
			else if(input == "my child is no longer appearing on my account"){
				response(ai_answers[33]);
				backTopic = "Account / Email";
			}

		//Application Topic
		else if(input == "application"){
			response("Which aspect of the application do you need help with?", application_list);
			backTopic = "I would like to start over."
		}
			else if(input == "general information on applying"){
				response("What information are for you looking for?", generalApply_list);
				backTopic = "Application";
			}
				else if(input == "when can i apply?"){
					response(ai_answers[22]);
					backTopic = "General information on applying";
				}
				else if(input == "where or how do i apply?"){
					response(ai_answers[24]);
					backTopic = "General information on applying";
				}
				else if(input == "apply on behalf of parents/carers"){
					response(ai_answers[17]);
					backTopic = "General information on applying";
				}
				else if(input == "apply for more than 1 child"){
					response(ai_answers[14]);
					backTopic = "General information on applying";
				}
				else if(input == "how old must my child be to apply?"){
					response(ai_answers[19]);
					backTopic = "General information on applying";
				}
				else if(input == "closing dates for application"){
					response(ai_answers[23]);
					backTopic = "General information on applying";
				}
				else if(input == "how to attach documents?"){
					response(ai_answers[18]);
					backTopic = "General information on applying";
				}
				else if(input == "child's name changed by deed poll"){
					response(ai_answers[32]);
					backTopic = "General information on applying";
				}
			else if(input == "in year application / school transfer"){
				response(ai_answers[10]);
				backTopic = "Application";
			}
			else if(input == "out of cohort (summer born)"){
				response(ai_answers[9]);
				backTopic = "Application";
			}
			else if(input == "waiting list"){
				response(ai_answers[16]);
				backTopic = "Application";
			}
			else if(input == "council tax"){
				response(ai_answers[13]);
				backTopic = "Application";
			}
			else if(input == "outcome information"){
				response(ai_answers[21]);
				backTopic = "Application";
			}
			else if(input == "issues with my application"){
				response("What issues are you having with your application?", issuesApplication_list);
				backTopic = "Application";
			}
				else if(input == "child already exist"){
					response(ai_answers[6]);
					backTopic = "Issues with my application";
				}
				else if(input == "child's date of birth not accepted"){
					response(ai_answers[8]);
					backTopic = "Issues with my application";
				}
				else if(input == "cannot add sibling preferences"){
					response(ai_answers[31]);
					backTopic = "Issues with my application";
				}
				else if(input == "my address is not showing up"){
					response(ai_answers[12]);
					backTopic = "Issues with my application";
				}
				else if(input == "current school/nursery not listed"){
					response(ai_answers[20]);
					backTopic = "Issues with my application";
				}
				else if(input == "school preferences not listed"){
					response(ai_answers[30]);
					backTopic = "Issues with my application";
				}
			else if(input == "making changes to my application"){
				response("What would you like to change on your application?", changeApplication_list);
				backTopic = "Application";
			}
				else if(input == "edit my child's details"){
					response(ai_answers[25]);
					backTopic = "Making changes to my application";
				}
				else if(input == "edit my school preferences"){
					response(ai_answers[15]);
					backTopic = "Making changes to my application";
				}
				else if(input == "change my address after submitting my application"){
					response(ai_answers[11]);
					backTopic = "Making changes to my application";
				}
				else if(input == "how to attach documents to my application"){
					response(ai_answers[18]);
					backTopic = "Making changes to my application";
				}

		//Contact Topic
		else if(input == "contact us"){
			response("Whom do you like to contact?", contact_list);
			backTopic = "I would like to start over."
		}
			else if(input == "contact my local authority"){
				response(ai_answers[28]);
				backTopic = "Contact Us"
			}
			else if(input == "contact the support desk"){
				response(ai_answers[29]);
				backTopic = "Contact Us"
			}

		//Go to AI
		else{
			checkNLP(input);
		}
	}

	//Enabling the input, enables the textfield
	$: if(wait == false){
		document.getElementById("input_message").disabled = false;
	}

	//Check NLP API to get intent, entity and trait
	async function checkNLP(input){
		var sParameter = encodeURIComponent(input.trim());
		fetch("https://api.wit.ai/message?v=20220906&q=" + sParameter,{
			headers: { 'Authorization': 'Bearer'
			}
		}).then(response => response.json()).then(json => ai_response(json.intents, json.entities, json.traits))
	}


</script>

<main id="main">
	<head>
		<script src="https://kit.fontawesome.com/71091cd23f.js" crossorigin="anonymous"></script>
	</head>
	<div id="top">
		<img src="images/logo_white.png" alt="eAdmissions" style="width:auto; height:auto; max-height:33px; margin-right:5px;">Help Bot
	</div>
	<div id="top_right">
		<a id="closeChat" on:click={closeChat}><span class="fas fa-angle-down" aria-hidden="true"></span></a>
    </div>
	<div class="outer">
		<div class="container" id="chatbox" style="overflow-y: scroll;">
			<!--chatbot-->
			{#each messages as { text, who }}
				<div>
					{#if who == "opinion"}
						<button in:fly={{y:50, opacity: 0, duration: 250}} on:click={() => send({text})} class="opinion_box">{text}</button>
					{:else if who == "back"}
						<button in:fly={{y:50, opacity: 0, duration: 250}} on:click={() => send({text: backTopic})} class="back_box"><i class="fa fa-chevron-left" style="color:#6F4077" aria-hidden="true"></i> Back</button>
					{:else}
						<div in:fly={{y:50, opacity: 0, duration: 250}} style="width: auto; max-width:80%; height: auto" class="box {who}">
							{@html text}
						</div>
					{/if}
				</div>
			{/each}
			<!--Bubbles chat while waiting for our response-->
			{#if wait == true}
			<div transition:fade={{duration: 200}}>
				<div class="bubbles_box them">
					<div>
						<Bubbles/>
					</div>
				</div>
			</div>
			{/if}
			<!--End of chatbot-->
		</div>
		<button id="reset" on:click={() => send({text: "I would like to start over."})}><i class="fa fa-home" aria-hidden="true"></i></button>
		<input type="text" id="input_message" on:keypress={pressEnter}>
		<button id="send" on:click={() => send()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
	</div>	
</main>

<button id="open" name="btn_openchatbot" on:click={openChat}>
	<span class="fa fa-comments fa-lg" style="color:white; padding-top:8px" aria-hidden="true"></span>
</button>

<style>
	/*Open button to open up the chatbot*/
	#open{
		border-top-left-radius: 5px;
		background-color: #70457a;
		bottom: 0;
		right: 0;
		width: 60px;
		height: 45px;
		position: fixed;
		z-index: 1000;
		padding: 0;
		border: none;
		cursor: pointer;
	}

	/*User's input*/
	#input_message{
		width: 250px;
		height: 45px;
		position: absolute;
		bottom: 0;
		right: 0;
		margin-right: 50px;
		margin-bottom: 0;
		border: none;
		border-top: 1px solid #70457a;
		font-family: Arial, Helvetica, sans-serif !important;
	}
	#input_message:focus{
		border: none;
		border-top: 1px solid #70457a;
		outline: none;
	}
	#input_message:disabled{
		background-color: #d1cfcf;
	}
	/*Send button for the user*/
	#send{
		width: 50px;
		height: 45px;
		position: absolute;
		bottom: 0;
		right:0;
		margin: 0;
		background-color: #70457a;
		color: white;
		font-size: 14px;
		font-family: Arial, Helvetica, sans-serif !important;
		padding: 0;
		border: none;
		cursor: pointer;
	}
	/*Send button for the user*/
	#reset{
		width: 50px;
		height: 45px;
		position: absolute;
		bottom: 0;
		left:0;
		margin: 0;
		background-color: #70457a;
		color: white;
		font-size: 14px;
		font-family: Arial, Helvetica, sans-serif !important;
		padding: 0;
		border: none;
		cursor: pointer;
	}

	/*Full size*/
	main{
		border-top-left-radius: 10px;
		background: #70457a;
		font-family: Arial, Helvetica, sans-serif !important;
		width: 351px;
		height: 600px;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 1000;
		display: none;
		color: #4a4a4a;
	}
	/*Size including container and buttons*/
	.outer {
		border-top-left-radius: 10px;
		background: #fafafa;
		width: 350px;
		height: 560px;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	/*size of text area without the buttons*/
	.container{
		top:0;
		position: absolute;
		height: 512px;
		width: 350px;
	}

	/*Allocating component to top and top-right*/
	#top_right{
		color: #fafafa;
		top: 0;
		right: 0;
		width: 20px;
		height: 20px;
		margin-top: 5px;
		margin-right: 10px;
		font-size: 20px;
		position: absolute;
	}
	#top{
		color: #fafafa;
		top: 0;
		display: flex;
		justify-content: center;
		font-size: 18px;
		margin-top: 3px;
		margin-right: 30px;
		line-height: 33px;
		font-family: Verdana !important;
	}
	/*Styling for link that is on the close button*/
	a{
		text-decoration: none;
		color: #fafafa;
	}

	/*Scroll bar*/
	::-webkit-scrollbar {
		width: 0px;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
	}

	/*Chat area CSS*/
	.box{
		background-color: #eee;
		border-radius: 10px;
		margin: 8px 0px 8px 8px;
		padding: 15px;
		font-size: 13px;
		word-wrap: break-word;
		box-shadow: none;
	}
	.bubbles_box{
		background-color: #eee;
		border-radius: 10px;
		margin: 8px 0px 8px 8px;
		padding: 15px 8px 10px 8px;
	}
	.you{
		float: right;
		clear: both;
		background: #3865f4;
		color: #fafafa;
		border-bottom-right-radius: 0px;
	}
	.them{
		float: left;
		clear: both;
		border-bottom-left-radius: 0px;
		border: #CFCFCF solid 1px;
	}
	.opinion_box{
		height: 42px; 
		max-width: 80%;
		background-color:#fafafa;
		color: #6F4077;
		box-shadow: 0 0 0 1px rgb(10 10 10 / 20%);
		border: #6F4077 solid 1px; 
		cursor: pointer; 
		border-radius: 5px;
		float: left;
		clear: both;
		margin: 1px 0px 4px 8px;
		padding: 0px 20px;
		font-size: 13px;
	}
	.back_box{
		background-color:#fafafa;
		color: #6F4077;
		cursor: pointer; 
		border: none;
		float: left;
		clear: both;
		margin: 1px 0px 4px 8px;
		font-size: 12px;
	}
</style>