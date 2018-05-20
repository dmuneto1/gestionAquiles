#!/usr/bin/env python
# -*- coding: 850 -*-

import urllib3, requests, json, sys

# retrieve your wml_service_credentials_username, wml_service_credentials_password, and wml_service_credentials_url from the
# Service credentials associated with your IBM Cloud Watson Machine Learning Service instance

wml_credentials={
  "url": "https://ibm-watson-ml.mybluemix.net",
  "username": "6490bc65-d6d2-4cc4-a74d-83cae0715391",
  "password": "f4887677-241d-4d62-877d-bb16bbd50321"
}
headers = urllib3.util.make_headers(basic_auth='{username}:{password}'.format(username=wml_credentials['username'], password=wml_credentials['password']))
url = '{}/v3/identity/token'.format(wml_credentials['url'])
response = requests.get(url, headers=headers)
mltoken = json.loads(response.text).get('token')

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

entrada=input()
entrada=entrada.split(',')
# NOTE: manually define and pass the array(s) of values to be scored in the next line

dicProd={"Camiseta":1, "Blusa":2, "Pantalon":3, "Gorra":4}
dicColor={"Negro":1, "Blanco":2, "Gris":3,"Amarillo":4,"Rojo":5, "Verde":6,"Beige":7,"Cafe":8,"Rosado":9,"Azul":10}
dicMat={"Jean":1,"Drill":2,"Corduroy":3,"Algodon":4,"Poliester":5,"Licra":6}
idpd=0
idCo=0
idMat=0
idpd=dicProd[entrada[0]]
idCo=dicColor[entrada[1]]
idMat=dicMat[entrada[2]]
 

#idpd=1
#idCo=1
#idMat=1
values=[None, idpd, None,None,None, idCo,None,None, idMat, None,None,None,None,None,None,None]
#print(values)

payload_scoring = {"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad", "Costo envio"], "values": [values]}

response_scoring = requests.post('https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/01fd3ad5-c8cd-456b-82d4-53745170b251/deployments/d0d0867f-f774-492c-9098-ea0cd2344d36/online', json=payload_scoring, headers=header)
#print("Scoring response")
salida=(json.loads(response_scoring.text))
#print("Usted puede cobrar: ")
#print (salida)
valores= list(salida['values'])[0][21]
claves=list(salida['values'])[0][18]
dicc={}
for i in range(len(valores)):
	dicc[claves[i]]=valores[i]

claves= sorted(claves)

#print(dicc)
#print (claves)
#print ("--")
resultPrediccion=""
iter=0
for i in range(len(claves)-1,(len(claves)-3),-1):
	
	if iter<1:
		resultPrediccion+= str(dicc[claves[i]])+", "
	else:
		resultPrediccion+= str(dicc[claves[i]])
	iter+=1
print (resultPrediccion)
#print (salida["values"][0])
#print (list(salida['values'])[0][20])
