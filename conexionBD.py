from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey

USERNAME= "7b280d12-688a-484c-b883-4f6ee62b5a33-bluemix"
PASSWORD="1bcc20356edddceab5cfb5609759777ffbd1dd978ad23a08a688c435a09f8ebb"
URL="https://7b280d12-688a-484c-b883-4f6ee62b5a33-bluemix:1bcc20356edddceab5cfb5609759777ffbd1dd978ad23a08a688c435a09f8ebb@7b280d12-688a-484c-b883-4f6ee62b5a33-bluemix.cloudant.com"

client = Cloudant(USERNAME, PASSWORD, url=URL, connect=True)
session = client.session()

#databaseName = "productos"
databaseName = "ventas"

myDatabase=client[databaseName]
"""
def agregarDatos():
	myDatabase = client.create_database(databaseName)
	#myDatabase=client.get(databaseName)	
	#print (myDatabase)
	#if myDatabase.exists():
	#	print ("'{0}' successfully created.\n".format(databaseName))
	archivo= open("Datos.csv",'r')
	archivo.readline()
	sampleData=archivo.readlines()
	for i in sampleData:
		i=i.strip().split(',')
		jsonDocument={"referencia": i[0], "categoria": i[1],"nombre": i[2],"descripcion": i[3],"talla": i[4],"color": i[5],"precio": i[6],"material": i[7],"cuidados": i[8]	}
		newDocument = myDatabase.create_document(jsonDocument)
		if newDocument.exists():
			print ("Document '{0}' successfully created.".format(i[0]))
"""
archivo=open("dataset.csv","w")
def buscar():
	selector={"nombre": "Gorra"}
	docs=myDatabase.get_query_result(selector)
	for doc in docs:
		linea=list(doc.values())[2:len(list(doc.values()))]
		nuevaLinea= linea[0]+','+linea[1]+','+linea[2]+','+linea[3]+','+linea[4]+','+linea[5]+','+str(linea[6])+','+linea[7]+','+linea[8]+','+linea[9]+','+str(linea[10])
		archivo.write(nuevaLinea)
		print (linea)
		print(nuevaLinea)
	
buscar()

client.disconnect()