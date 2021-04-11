# RestAPI

Infoa:

Tässä projektissa loin REST APIn omasta MongoDB tietokannastani. Tietokannassa on tallennettuna Harry Potter fanfiction tarinoiden tietoja.
APIssa on kuusi Mongoosella toteutettua reittiä. Kolme GET-reittiä (lista alla) sekä POST-, PUT- ja DELETE- reitit.
Vastaus on JSON muodossa.
API testattu POSTMANillä.
Julkaistu Herokussa:
1. https://ficlibrary.herokuapp.com/api/getall (Haetaan kaikki data)
2. https://ficlibrary.herokuapp.com/api/6066e981dfe1269a82c6c0cf (Esimerkki, jossa haetaan dataa id:n perusteella)
3. https://ficlibrary.herokuapp.com/api/name/Draco%20Malfoy%20and%20the%20Letter%20from%20the%20Future (Esimerkki, jossa haetaan dataa nimen perusteella)

