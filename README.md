# Formdesigner project

This goal of the project is to create a simple Typescript / Node API allowing api user to manage a formdesigner.
Each form template contains typed fields that can be named by the user and marked as mandatory.

The following field types are needed :

text
numeric (fixed, float, percent ...)
true / false
list selector (from a specified list values)
To allow clear view on form display, user can group fields by sections in the form designer. A section can contains one or many sections or directly fields.

The API should allow creation and edition of form templates, fields and sections. Data should never be deleted in the db but user can mark as deleted and restore items in his interface.

The api should expose list of available form templates and a specific template by id returning all the informations of the selected item.


## UML generated via typeorm-uml

http://www.plantuml.com/plantuml/png/hLLHRzem47xthxXrqWHI4Dl3NgeqQig0eKsjnD2qIPCg4nzWuTZ8DgCK-Ezpd1122anJbpp4lk-xxtoVJygjiLJRPIe8USDmmYM2fME13PGqnG3OEFis0QNbTWrNuJZoIDWUHxzaE57IWk7FUFFXFIHAA7qprNGTDOgyi9qnegk3-cAEwyPJ4pOJZeBjm0c6Fl7w4zNplX8CvL2nA7pdY57OzbW4Jrd1KcHI5yaLtiR-UP5Rvhd0CfMdChkzx7MPAJ9EMneJfLbLWimuGp0MDIgxNg390odQcMB59k4w4KY8LGkm2iRAMfK2uqxDSYK9CNCk5rJJ5BHQIkPgIDJmiH8NxfYPF2ZjX2k0cL6cLbnEOKA5mGeoevAjDBSMPO5Lm4HGOs13m3rtD9bFVU5ErXMiPjoYHsAjrIeF6gHJZIZp36S2wXgm8wv3FoFmBMyiSA1VG1EeAJTPLN_Tm1aqhs5mF-hskqDmuU8Ym0sLm0phV8w7SMVaqE_nyEVWlbzbENDPrhdZtJqyVEt6zndgXm0ifWj1BGwEIeHXxqiKbIJdXHlWavHTsSoeK0fApRoTSlVAVWwLUjdi1U17CA-HB_-RONw2_aRwJSNIiqRT7wCgaBg1ebRfTStmLr_7mO5YH1vztoR_12UZHoDrZ1piAk11tRKSzUmQTZYAHnyB1RDV16VYbUjwYMqkbhnyM7UWlSnEjLhRRMbbFLviIMx26VAnKxljKUObZj-GCmt-0sTVYzoYPDd_vGy0

## Swagger

# Init

## Install dependencies

```npm install``` or ```yarn```


## Build & run the server

```npm run start```


# Tests

## Units

## Integrations


# Credits

Started from https://github.com/velotio-tech/typescript-express-web-server/tree/1ad2990d1f24bc57bcb4857976069a7e84420ad2

# Progress

- [x] Boilerplate
- [x] Adaptation to the needs
- [x] Entities
- [x] Migration generation
- [x] Template queries
- [x] Field queries
- [x] Section queries
- [x] Create fields populate associating table
- [x] Section fields management
- [ ] Section tree management
- [ ] TLS?
- [ ] Unit tests with Jest
- [ ] Integration tests with Postman
- [ ] Swagger generation
- [ ] Default fields migration
- [x] Try/Catch around data queries
- [ ] Better errors definition
- [ ] Validations with Joi