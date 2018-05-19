import urllib3, requests, json

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

dicMedio={"Contraentrega":1, "Consignacion":2}
dicCiu={"Medellin":1,"Cali":2,"Pereira":3,"Sabaneta":4,"Bello":5,"Bogota":6}
precio=int(entrada[0])
idMe=dicMedio[entrada[1]]
idCiudad=dicCiu[entrada[2]]
#idpd=1
#idCo=1
#idMat=1
values=[None, None, None,None,None, None,None,None, precio, None,None,None,idMe,None,idCiudad,None]
#print(values)

# NOTE: manually define and pass the array(s) of values to be scored in the next line
payload_scoring = {"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Precio", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad"], "values": [values]}

response_scoring = requests.post('https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/b62fd4af-852e-487b-a09f-3eb9c15172b2/deployments/43c3501a-e72d-4322-ba14-01a3354873fb/online', json=payload_scoring, headers=header)
#print("Scoring response")
salida=(json.loads(response_scoring.text))
#print("Usted puede cobrar: ")
#print (salida)
#print (salida["values"][0])
print (list(salida['values'])[0][20])


