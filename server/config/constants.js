'use strict';

let role = ['Attack', 'Aerobatic', 'Aerial crane', 'Aerial refueling', 'AWACS', 'Bomber', 'Cargo', 'Combat', 'Fighter',
'Ground attack', 'Missile', 'Maritime patrol', 'Multi role', 'Reconnaissance',
'Surveillance', 'Trainer', 'Transport', 'Utility' ];

let industry = ['commercial', 'private', 'military', 'aerospace'];

let type = ['Agriculture', 'Amphibian', 'Bomber', 'Carrier', 'Commercial',
'Commuter', 'Drone', 'Experimental', 'Fighter jet', 'Float', 'Jet',
'Light sports aircraft', 'Multi engine props', 'Piston helicopters',
'Single engine props', 'Turbine helicopters', 'Turboprops',
'Very light jet', 'VTOL', 'UAV'];

let category = ['Airplane', 'Airship', 'Balloon', 'Drone', 'Glider', 'Helicopter', 'Space shuttle', 'UAV'];

let engineType = ['Electric motor', 'Piston engine', 'Eingle engine', 'Turboprop'];

let productionStatus = ['In production', 'In development', 'Out of production'];

let airCraftManufacturers = ['AAR CORP', 'Airbus', 'AgustaWestland',
'AviaBellanca', 'Atlas Aviation', 'BAE Systems', 'Bell Helicopter', 'Beechcraft', 'Boeing', 'Bombardier Aerospace',
'Cessna Aircraft Company', 'Cirrus Design', 'Dassault Aviation', 'Diamond Aircraft Industries',
'Embraer', 'Eurocopter', 'General Dynamics Corporation', 'Gulfstream Aerospace', 'Honda Jet', 'Hindustan Aeronautics Limited',
'Lockheed Martin', 'Mooney Aircraft', 'Mil', 'Northrop Grumman', 'Piaggio Aero Industries',
'Pilatus Aircraft', 'Piper Aircraft', 'RSK MiG', 'Kamov', 'Raytheon Company', 'Robinson Helicopter Company', 'Rolls-Royce',
 'Safran Group', 'Sukhoi', 'SAAB', 'Sikorsky', 'Textron Aviation', 'Tupolev', 'United Technologies Corporation'];

let engineManufacturers = ['General Electric', 'Pratt & Whitney', 'Rolls-Royce',
'Safran Group', 'United Technologies Corporation'];


module.exports = {
  role: role,
  industry: industry,
  type: type,
  category: category,
  engineType: engineType,
  airCraftManufacturers: airCraftManufacturers,
  engineManufacturers: engineManufacturers,
  productionStatus: productionStatus
};
