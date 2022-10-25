//Working out current year/month and date ranges for each phrase
let current_year = new Date().getFullYear();
let current_month = new Date().getMonth() + 1;
if(current_month >= 9){
	current_year += 1;
}
let reception = [current_year-5, current_year-4];
let junior = [current_year-8, current_year-7];
let senior = [current_year-12, current_year-11];
let UTC = [current_year-15, current_year-14];

//Defining links used in our responses
let link_resetUsername = "https://www.eadmissions.org.uk/account/forgotusername";
let link_usernamePasswordVideo = "https://www.youtube.com/watch?v=AFZ8HgN_PMU&ab_channel=AdEPTEducation";
let link_resetPassword = "https://www.eadmissions.org.uk/account/forgotpassword";
let link_contactLA = "https://www.eadmissions.org.uk/contact";
let link_contactSupport = "https://www.eadmissions.org.uk/support/step1";
let link_registerVideo = "https://www.youtube.com/watch?v=o2WXUD8Fido&ab_channel=AdEPTEducation";

//AI responses
export let ai_answers = [
	//Recover Username - 0
	"<b>How to recover your username:</b><br>"+
	"Please start by visiting <a href='"+link_resetUsername+"' target='_blank'>here!</a><br><br>"+
	"To recover your username you will only need to provide two of the following: <b>email address</b>, <b>postcode</b> or <b>mobile number</b>.<br><br>"+
	"If you have provided the correct information relating to the account, then on the next page the account's username will be displayed.<br><br>"+
	"A video tutorial for resetting your username and password is available <a href='"+link_usernamePasswordVideo+"' target='_blank'>here</a>.",
	//Recover Password - 1
	"<b>How to reset your password:</b><br>"+
	"Please starting by visiting <a href='"+link_resetPassword+"' target='_blank'>here!</a><br><br>"+
	"Depending on if your account was created on the eAdmissions website or elsewhere, you will be directed to different areas to reset your password.<br><br>"+
	"<b>Account created on eAdmissions</b>:<br>On the next page, you will have the option to send a new password via SMS or email. Once chosen, the correct mobile number or email address must be entered for you to receive the new password.<br><br><b>Account created outside of eAdmissions:</b><br>On the next page, you will be provided with a link to reset your password, please follow the instruction there and once completed you can try logging in with your new password.<br><br>"+
	"A video tutorial for resetting your username and password is available <a href='"+link_usernamePasswordVideo+"' target='_blank'>here</a>.",
	//Recover Account - 2
	"<b>How to recover your username:</b><br>"+
	"Please start by visiting <a href='"+link_resetUsername+"' target='_blank'>here!</a><br><br>"+
	"To recover your username you will only need to provide two of the following: <b>email address</b>, <b>postcode</b> or <b>mobile number</b>.<br><br>"+
	"If you have provided the correct information relating to the account, then on the next page the account's username will be displayed.<br><br>"+
	"<b>How to reset your password:</b><br>"+
	"Please starting by visiting <a href='"+link_resetPassword+"' target='_blank'>here!</a><br><br>"+
	"Depending on if your account was created on the eAdmissions website or elsewhere, you will be directed to different areas to reset your password.<br><br>"+
	"<b>Account created on eAdmissions</b>:<br>On the next page, you will have the option to send a new password via SMS or email. Once chosen, the correct mobile number or email address must be entered for you to receive the new password.<br><br><b>Account created outside of eAdmissions:</b><br>On the next page, you will be provided with a link to reset your password, please follow the instruction there and once completed you can try logging in with your new password.<br><br>"+
	"A video tutorial for resetting your username and password is available <a href='"+link_usernamePasswordVideo+"' target='_blank'>here</a>.",
	//Account doesn't exist - 3
	"If you are returning to the website, entering your account details and receiving a message saying your <b>Account doesn't exist</b>  please be aware that we remove accounts that have not been used within a 3 year period from the website. You will need to register again.",
	//Email not received - 4
	"Check to make sure that the relevant email has not been misidentified as junk and deposited in the <b>Junk</b> folder.<br><br>The service providers who suffer most from the problem of incorrectly identifying key emails as spam have proved to be:<br><br>aol.com<br>hotmail.com<br>hotmail.co.uk<br>yahoo.co.uk<br>yahoo.com<br>btinternet.com<br><br>"+
	"For outcome emails that are not in your junk/spam folder, you can query for 'outcome information' below for extra information or please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page for more information.<br><br>"+
	"You will not receive an outcome email if your application reference number has a <b>K</b> in it  for example 432-2022-09-K-001234",
	//Validate email - 5
	"When you first register to use the eAdmissions website you will be asked to validate your email address. You can do this by clicking the link or copying and pasting the link into a browser from the automated validation email you will receive.<br><br>"+
	"If you experience problems please contact the Support Desk on 0208 255 55 55 option 1 or you have a technical enquiry relating to your account and you would like to raise this with the Support Desk, please click <a href='"+link_contactSupport+"' target='_blank'>here</a>.<br><br>"+
	"<b>The Support Desk is available between 8am - 6pm Monday to Friday, with the exception of Bank Holidays.</b>",
	//Child already exist - 6
	"There are a couple of reasons why you are seeing the error <b>Child Already Exist</b>:<br><br>"+
	"1) The child has already been added to your account, your childs name will be listed on your <b>Home</b> page, select the <b>Start new application</b> button below the child's name to get started.<br><br>"+
	"This button will only be available for children whose date of birth falls within a relevant age range.<br><br>"+
	"2) Your child has already been registered by another person/family member on a different account.",
	//Mobile already exist - 7
	"When setting up a new account if you get a message saying that your mobile phone number is already registered, this could be because you have:<br><br>"+
	"&#x2022 Worked or connected in some way to a London school past or present<br><br>&#x2022 Registered on the LGfL Free school meal Eligibility Checker<br><br>You will need to use a different mobile number or <a href='"+link_contactSupport+"' target='_blank'>click here</a> to contact the Support Desk.",
	//DOB is incorrect - 8
	"If you get an error message stating that your childs date of birth is incorrect.<br><br>"+
	"Please make sure you have either entered the correct date of birth for your child or your child date of birth is within the following age ranges for <b>September "+ current_year +"</b>:<br><br>"+
	"<b>Reception application</b><br>01/09/"+ reception[0] +" - 31/08/"+ reception[1] + "<br><br>"+
	"<b>Junior (Year 3) application</b><br>01/09/"+ junior[0] +" - 31/08/"+ junior[1] + "<br><br>"+
	"<b>Secondary (Year 7) application</b><br>01/09/"+ senior[0] +" - 31/08/"+ senior[1] + "<br><br>"+
	"<b>University Technical College or Studio School application</b><br>01/09/"+ UTC[0] +" - 31/08/"+ UTC[1] + "<br><br>"+
	"In addition, this website can be used to apply for a nursery place by residents of the boroughs of Bexley, Enfield, Merton and Tower Hamlets only. See your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a>.<br><br>"+
	"If your child's date of birth falls outside of the age ranges stated above and you want to make an application to transfer your child to another school, please contact your Home <a href='"+link_contactLA+"' target='_blank'>Local Authority</a>.",
	//Out of Cohort - 9
	"You may be able to apply online if you child is out of cohort (summer born) and you require a school place for September "+ current_year +".<br><br>Please contact your Home <a href='"+link_contactLA+"' target='_blank'>Local Authority</a>.",
	//In year - 10
	"You cannot make an in-year application or transfer to another school on this website. You need to apply through your Home Local Authority's website.<br><br>Please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page for more information.",
	//Change address after submitting an application - 11
	"If the child moves to a different Home Local Authority, after you have submitted an application then you must do the following:<br><br>"+
	"<b>First</b> - Inform the child's original Home Local Authority that the child has moved out of the area to a new address. Your Home Local Authority details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page. Any existing application may need to be cancelled by the Home Local Authority so that a new application can be made.<br><br>"+
	"<b>Second</b> - Contact the child's new Home Local Authority details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page. They will let you know what to do next. You may be asked to complete a new application.",
	//Address not showing in the dropdown list - 12
	"You can register online if your home address is recognised by the Pan London eAdmissions system.<br><br>"+
	"The dropdown address list will not always list addresses in the order you may expect, please make sure you scroll down the whole list.<br><br>"+
	"If your address is not listed on the dropdown list, please use the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page to get information on how to contact your Local Authority.",
	//Council tax number - 13
	"Not all Local Authorities request your Council tax account number. If your Home Local Authority requires this information there will be a Council Tax box for you to complete in the Child's details section.<br><br>"+
	"Local Authorities will be using the Council Tax account number to check the child's home address.<br>Failure to provide council tax details for your child's home address may lead to the offer of a school place being delayed.<br><br>"+
	"Other Local Authorities may require a copy of your Council Tax Statement, you can find out more from your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Apply for more than one child - 14
	"You can apply for children in different year groups as long as their date of birth is within the relevant range for one of the following phases of education:<br><br>"+
	"Nursery (selected authorities)<br>Reception<br>Junior (Year 3)<br>Secondary (Year 7 transfer)<br>University Technical College (14-19)<br><br>"+
	"To start each application click on <b>Start an application</b>, this will take you through the application process. You must ensure that you submit a separate application for each child. Once you start this process your children will be listed on your <b>Home</b> page.  It will display a separate application reference number for each child once you submit the application.<br><br>"+
	"<b>Applying for twins and multiple births</b><br>"+
	"A multiple birth is the birth of more than one baby from a single pregnancy.<br><br>You can apply online for twins and multiple births.<b>You must ensure that you submit a separate application for each child</b>.<br><br>When applying you should see all children listed on your <b>Home</b> page with a separate application reference for each child.",
	//Edit preferences - 15
	"You can change, edit, remove any school preference on your application until the closing date, which is:<br><br>"+
	"31st October for secondary applications<br>15th January for reception and junior applications<br><br>"+
	"To make a change go to the <b>Home</b> page and login as a returning visitor, you will see your childs name and your application reference number, and below click on <b>Edit Selected Schools</b><br><br>"+
	"You can change the order of the schools you have listed by using the <b>up</b> or <b>down</b> arrows. It is important to check that you have put the schools in the right order before submitting your application.<br><br>"+
	"<b>You must resubmit your application for any changes to be sent to your Local Authority.</b>",
	//Waiting list - 16
	"Waiting list information is not held on this website. You will need to contact your Home Local Authority, their details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Apply on behalf - 17
	"School staff or other professionals who wish to help parents to use the system must not register to create applications on behalf of parents/carers. They must ensure that the child's parent or carer has an email address and registers personally.",
	//Attach documents - 18
	"Once you have submitted your application you will be able to use the <b>attach</b> function to add documents to it.<br><br>"+
	"Please ensure that you know where you have saved the document on your computer, the document should be in PNG, JPG or  PDF format and no bigger than 5MB. You can photograph your supporting documentation and attach them to your application.<br><br>"+
	"1) Select the type of document from the dropdown list.<br><br>2) Select the <b>Browse</b> button to find the document you want to attach from your computer.<br><br>3) Select the document and then select the <b>Open</b> button to return to the <b>Attach a File</b> screen.<br><br>4) Select the <b>Attach a File</b> button to upload your document.<br><br>5) You will see details of the file you have sucessfully attached and will be sent email confirmation of this.<br><br>6) Select <b>Withdraw</b>, if you have uploaded a document by mistake and no longer want the document to be considered as part of your application. The document will disappear from the screen and the Local Authority will be informed.<br><br>"+
	"If you are unable to attach any documents please send them to your Home Authority you can find their details on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page. You must quote your child's name and application reference number on each document.<br><br>"+
	"<b>Please Note:</b> Supplementary Information Forms (SIFs) must be sent directly to the school.",
	//How old must my child be to apply - 19
	"You can use this website to apply for children born between the following dates for <b>September "+ current_year +"</b>:<br><br>"+
	"<b>Reception application</b><br>01/09/"+ reception[0] +" - 31/08/"+ reception[1] + "<br><br>"+
	"<b>Junior (Year 3) application</b><br>01/09/"+ junior[0] +" - 31/08/"+ junior[1] + "<br><br>"+
	"<b>Secondary (Year 7) application</b><br>01/09/"+ senior[0] +" - 31/08/"+ senior[1] + "<br><br>"+
	"<b>University Technical College or Studio School application</b><br>01/09/"+ UTC[0] +" - 31/08/"+ UTC[1] + "<br><br>"+
	"In addition, this website can be used to apply for a nursery place by residents of the boroughs of Bexley, Enfield, Merton and Tower Hamlets only. See your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a>.<br><br>"+
	"If your child's date of birth falls outside of the age ranges stated above and you want to make an application to transfer your child to another school, please contact your Home <a href='"+link_contactLA+"' target='_blank'>Local Authority</a>.",
	//Current school/nursery not listed - 20
	"If your childs current school/nursery is not listed.<br><br>"+
	"Type in 'School not listed' or 'Nursery not listed' and select this option, this will give you a text box where you can type in the name of the school/nursery.",
	//Outcome information - 21
	"The outcome to your online application will be sent by email, push notificatuon and text (dependent on what you have signed up to receive) during the evening on the following days:<br><br>"+
	"1 March "+current_year+" - Secondary, UTC and Studio schools<br>19 April "+current_year+" - Reception and Junior schools<br><br>"+
	"For nursery schools please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page, ONLY the following 4 Local Authorities allow nursery applications online. Bexley, Enfield, Merton and Tower Hamlet.<br><br>"+
	"The email that is sent on outcome day will have a <b>reply</b> button at the bottom, which you can use to take you to the eAdmissiomns website. Your Local Authority may send you a letter explaining your outcome. Please read the letter carefully. You may need to respond to them by post or by logging into your <b>My school admissions</b> page, then select <b>View outcome and respond</b>.<br><br>"+
	"Applications made after the closing dates will be classed as a late application and will not receive an outcome online. Please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.<br><br>"+
	"If you applied on time and have not received your outcome email by 19.30 please log into the website to view your outcome. You can login to your existing account to see your <b>My school admissions</b> page, then select <b>View outcome and respond</b>.<br><br>"+
	"If you wish to decline your outcome, your child may not get a school place.",
	//When can I apply - 22
	"You can start to apply from the 1st September "+(current_year-1)+" for a child starting school in September "+current_year+".<br><br>You can apply for a place in:<br>"+
	"&#x2022 A Primary school (Reception)<br>&#x2022 A Junior school (Year 3)<br>&#x2022 A Secondary school (Year 7)<br><br>"+
	"In some areas you can apply for a place in:<br>"+
	"&#x2022 A Nursery class or school (Age 3+)<br>&#x2022 A University Technical College (Year 10)<br><br>"+
	"For nursery schools please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page, ONLY the following 4 Local Authorities allow nursery applications online. Bexley, Enfield, Merton and Tower Hamlets.",
	//Closing dates for application - 23
	"31 October "+(current_year-1)+" is the closing date for a child starting Secondary school (Year 7) and a University Technical College (Year 10)<br><br>"+
	"15 January "+current_year+" is the closing date for a child starting Primary school (Reception) and Junior school (Year 3)<br><br>"+
	"To find out the closing dates for nursery schools, please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page, ONLY the following 4 Local Authorities allow nursery applications online. Bexley, Enfield, Merton and Tower Hamlets.<br><br>"+
	"Applications made after these dates will be classed as a late application, please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Where or How do I apply - 24
	"You must register on the Pan London eAdmissions system in order to obtain a username and password, which will allow you to make an online school admissions application.<br><br>"+
	"A video tutorial for registering for an account is available <a href='"+link_registerVideo+"' target='_blank'>here</a>.<br><br>"+
	"You can start to apply from the 1st September "+(current_year-1)+" for a child starting school in September "+current_year+".<br><br>You can apply for a place in:<br>"+
	"&#x2022 A Primary school (Reception)<br>&#x2022 A Junior school (Year 3)<br>&#x2022 A Secondary school (Year 7)<br><br>"+
	"In some areas you can apply for a place in:<br>"+
	"&#x2022 A Nursery class or school (Age 3+)<br>&#x2022 A University Technical College (Year 10)<br><br>"+
	"For nursery schools please check the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page, ONLY the following 4 Local Authorities allow nursery applications online. Bexley, Enfield, Merton and Tower Hamlets.",
	//Edit child details - 25
	"On your <b>Home</b> page, click on <b>Edit child details</b> underneath your childs name.<br><br>"+
	"When you have finished making your changes you must resubmit your application. Once completed you will receive an email confirmation.<br><br>"+
	"If you do not resubmit your application your changes will not be sent to your Home Local Authority.<br><br>"+
	"After the closing date you MUST ensure you keep your Home Local Authority informed of any change of circumstances, in particular regarding a change of address or other contact details.",
	//Edit my details - 26
	"On your <b>Home</b> page, hover over your username in the top-right hand side of the screen and click on <b>Update my details</b>.<br><br>"+
	"Your details will be displayed, click on <b>Change details</b><br><br>"+
	"Make the necessary changes you need and click on <b>Save</b> at the bottom of the page when you are done.<br><br>"+
	"If you have changed your email address, you will be sent a validation email, with instructions for you to follow to validate your new email address, failure to validate your new email address means the eAdmissions website will continue to use your old email address.",
	//Account already exist - 27
	"If the website says that you already have a USO username and password this could be due to one of the following:<br><br>"+
	"<b>You have already registered on the website</b>, for example to make an application for another child.<br><br>"+
	"<b>You work/worked in a school</b>, for example as a School Governor or a Teaching Assistant. Your username will probably be the initial of your first name, then your surname, then a number, then a dot, then a three digit number - e.g. jsmith4.123<br><br>"+
	"<b>You have registered to use</b> the LGfL FSM Eligibilty checker.",
	//Contact local authority - 28
	"Your Local Authority contact details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Contact support desk - 29
	"The Service Desk is available between 8am - 6pm Monday to Friday, with the exception of Bank Holidays.<br><br>"+
	"If you have a technical enquiry or are experiencing problems logging in to the application, please complete the following form <a href='"+link_contactSupport+"' target='_blank'>here</a> and our Support Team will investigate the issue and get back to you.",
	//School Preference not listed - 30
	"If the school preferences you want are not listed, you will need to contact your Local Authority.<br><br>"+
	"Your Local Authority contact details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Cannot add sibling preferences - 31
	"If the website is not allowing you to add a sibling preference, this means that the school is not taking this into account so you will need to apply without filling this section in.",
	//Deed poll name change - 32
	"It is best to contact your Local Authority to confirm if they would like you to put in the childs deed poll name or the name given at birth.<br><br>"+
	"Your Local Authority contact details can be found on the <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page.",
	//Child no longer exist on the account - 33
	"If you are returning to the website and your child is no longer listed on your <b>Home</b> page, please look to re-add them by clicking on <b>Start an application<b>",



];

//Our responses
export let responses = [
	//Glossary
	"<b>Common Application Form (CAF)</b><br>Local authorities may ask you to complete a CAF. The eAdmissions application form is an online Common Application Form (CAF).<br><br>"+
	"<b>Council</b><br>The word 'Council' is referred to as Local Authority on this website.<br><br>"+
	"<b>In Year Application</b><br>If you want to apply for a primary or secondary school place outside of the usual times when a child starts a new school you must make an In year admission application. This type of application can also be called mid phase or mid term entry. You cannot make an In year application on this website.Please check your Local Authority details page for more information.<br><br>"+
	"<b>Late Application</b><br>A late application refers to an application that is made after the specified closing date. Please check your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page for more information.<br><br>"+
	"<b>Proof of Address</b><br>Some Local Authority's ask for proof of address. Please check your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page for more information.<br><br>"+
	"<b>Sibling (Adding a child)</b><br>The word 'Sibling' is referred to brother or sister, half brother or sister, adopted brother or sister, step brother or sister, or the child of the parent/carer's partner, and in every case, who is living as part of the same family unit at the same address. Local Authorities may have slightly different definitions of who can be considered as a brother or sister. Please check your <a href='"+link_contactLA+"' target='_blank'>Local Authority details</a> page for more information as they may be different. If you feel that your circumstances are unusual and are not sure whether to include the brother/sister information, you should contact the Local Authority for advice.<br><br>"+
	"<b>Transfer</b><br>The word 'Transfer' is used on this website when a child is moving from a primary school to a secondary school (year 7 transfer).<br><br>"+
	"<b>Types of schools available on this website:</b><br>&#x2022 Community schools, which are sometimes called Local Authority maintained schools<br>&#x2022 Foundation schools and voluntary schools<br>&#x2022 Academies and free schools<br>&#x2022 Grammar schools<br>&#x2022 Faith schools (Roman Catholic, Church of England, Anglican, Jewish, Muslim, Hindu, Sikh)",
	//Greeting
	"Hi, I'm Ely the eAdmissions help bot. I can help with all sorts of queries. Please choose one of the topics below or type in the textbox to ask me directly.",
];