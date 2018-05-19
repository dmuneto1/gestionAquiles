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
# NOTE: manually define and pass the array(s) of values to be scored in the next line

"""
while (True):
	
	nombre=str(input("Escriba el nombre del producto: "))
	color=str(input("Escriba el color del producto: "))
	talla=str(input("Escriba la talla del producto: "))
	
	if nombre=='Camiseta':
		nombre=1
	"""
	#values=[[None, "Id producto", "Producto", None,None, "Id Color", "Color", "Talla", "Precio", "Id Material",None,None, "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad"]]
values=[None,1,None, None,None,None,None,None,None,None,None,None, 1, None, 2, None]

payload_scoring = {"fields": ["Referencia", "Id producto", "Producto", "Descripcion", "Cantidad", "Id Color", "Color", "Talla", "Precio", "Id Material", "Material", "Cuidados", "Id Medio de Pago", "Medio de pago", "Id Ciudad", "Ciudad"], "values": [values]}


response_scoring = requests.post('https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15bfc20c-6cf5-4c37-8297-5340360560f4/published_models/a1de89b3-c6fd-4276-a39e-29795cf9668f/deployments/db34a4f4-347b-4aaf-90bf-79b896445bba/online', json=payload_scoring, headers=header)
#print("Scoring response")
salida=json.loads(response_scoring.text)
print("Usted puede cobrar: ")
print (salida)
print (salida["values"][0])
print (list(salida['values'])[0][20])

