'use strict';

// ROLE
let roles = ['Attack', 'Aerobatic', 'Aerial crane', 'Aerial refueling', 'AWACS', 'Bomber', 'Cargo', 'Combat', 'Fighter',
'Ground attack', 'Missile', 'Maritime patrol', 'Multi role', 'Reconnaissance',
'Surveillance', 'Trainer', 'Transport', 'Utility' ];

// INDUSTRY
let industries = ['Commercial', 'Private', 'Military', 'Aerospace'];

// TYPE
let aircraftTypes = ['Agriculture', 'Amphibian', 'Bomber', 'Carrier', 'Commercial',
'Commuter', 'Drone', 'Experimental', 'Fighter jet', 'Float', 'Jet',
'Light sports aircraft', 'Multi engine props', 'Piston helicopters',
'Single engine props', 'Turbine helicopters', 'Turboprops',
'Very light jet', 'VTOL', 'UAV'];

// CATEGORY
let categories = ['Airplane', 'Airship', 'Balloon', 'Drone', 'Glider', 'Helicopter', 'Space shuttle', 'UAV'];

// ENGINE TYPE
let engineTypes = ['Electric motor', 'Piston engine', 'Single engine', 'Turboprop'];

// PRODUCTION STATUS
let productionStatus = ['In production', 'In development', 'Out of production'];

// AIRCRAFT MANUFACTURERS
let airCraftManufacturers = ['AAR CORP', 'Airbus', 'AgustaWestland',
'AviaBellanca', 'Atlas Aviation', 'BAE Systems', 'Bell Helicopter', 'Beechcraft', 'Boeing', 'Bombardier Aerospace',
'Cessna Aircraft Company', 'Cirrus Design', 'Dassault Aviation', 'Diamond Aircraft Industries',
'Embraer', 'Eurocopter', 'General Dynamics Corporation', 'Gulfstream Aerospace', 'Honda Jet', 'Hindustan Aeronautics Limited',
'Lockheed Martin', 'Mooney Aircraft', 'Mil', 'Northrop Grumman', 'Piaggio Aero Industries',
'Pilatus Aircraft', 'Piper Aircraft', 'RSK MiG', 'Kamov', 'Raytheon Company', 'Robinson Helicopter Company', 'Rolls-Royce',
 'Safran Group', 'Sukhoi', 'SAAB', 'Sikorsky', 'Textron Aviation', 'Tupolev', 'United Technologies Corporation'];

// ENGINE MANUFACTURERS
let engineManufacturers = ['General Electric', 'Pratt & Whitney', 'Rolls-Royce',
'Safran Group', 'United Technologies Corporation'];


module.exports = {
  roles: roles,
  industries: industries,
  aircraftTypes: aircraftTypes,
  categories: categories,
  engineTypes: engineTypes,
  airCraftManufacturers: airCraftManufacturers,
  engineManufacturers: engineManufacturers,
  productionStatus: productionStatus
};
