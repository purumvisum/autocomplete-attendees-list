# Autocomplete Attendees List

Based on:
- Create app typescipt template
- Mobx
- Material Ui for styles 

## Main functionality
- A user can get access to the contacts pressing "@" symbol.
- A user can continue typing in "the title field" and the contact list would be filtered according to the text.
- A use can choose one contact from the list and it will replace "@text" in "the title field". A word , which becomes a contact, changes it's styles. 
- A user can edit contact in the title. (Functionalyty similar to the Slack input field)

## To run locally:
Download the main branch
```
npm install
npm start
```

## Known issues
- If a user selects a contact with a mouse and then removes the contacts, the contact remains in attenddes list;
- If a user adds a person twice and then removes one (so one contact is still in the title), it would be removed from the list of attendees;
- If a user removes the first letter of contact, the contact will not be set in the edit mode. 

## Further improvements 
- Add Test 
- FIx bugs
- Add an arrow navigation when contact list appear 
- Add groups, ex @frontendTeam,  that will add all team members 
- Show first contacts with whom a user has the most meetings. 


## Demo:

https://user-images.githubusercontent.com/8194677/170837678-9f9b9a38-60fe-4a13-b235-15e242d3ae21.mp4


