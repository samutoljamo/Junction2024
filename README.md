# Junction-2024
https://joint-sadly-shrimp.ngrok-free.app
## Problem overview
Challenge Name: Modernizing a Trillion-Euro Inventory
Challenge Tagline: Empower the Built World with AI and Create the Ultimate Digital Twin
Objective: Develop an AI-driven, user-friendly solution to automate equipment inventory surveys in buildings, streamlining the data collection process for mechanical, electrical, and plumbing equipment.
## Solution
### Overview
Our solution is focused on automating equipment inventory surveys. Our implementation contains PWA, which allows its user to digitally collect information on equipments easily. The app uses 2d versions of floor maps and shows the locations of surveyed equipments on it. Users can either add new visits to existing equipment, add new equipment or replace the existing equipment. When users are adding new equipment, OpenAI's vision API is used to fill certain fields like serial numbers automatically. GPS is used to locate the user within the floor, but the user is able to modify the location in case it is not accurate enough.

### Rationale
We believe that simply digitizing traditional survey methods already provides the greatest value. However, we utilize automated solutions such as auto-filling fields based on images and using GPS to locate the device, making data entry as easy as possible. Since these features are not fail-proof, everything is shown to the user so that it is easy to correct any errors while preserving usability.

## Future considerations
As a demo, this app stores the defined data model inside localStorage. However, in a real world app a database could be used to store the data along with a backend server, which provides the API. A backend could allow for other applications to interact with similar data. Also, the data model contains all the required information to combine it with BIM, if that would be deemed useful.
