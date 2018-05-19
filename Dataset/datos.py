import random
#archivo=open("referencias.csv",'r')
#nombres=open("nombres.csv",'r')
#cantidad=open("cantidad.csv", 'r')
#colores=open("colores.csv",'r')
#talla=open("tallas.csv", 'r')
#precio=open("precio.csv",'r')
#material=open("material.csv",'r')
#iDprod=open("idProd.csv",'r')
#idMa=open("idMat.csv",'r')
#idColores=open("idColores.csv",'r')
#venta= open("venta.csv",'r')

#Llenar referencia
'''
for i in range (1500):
    val=random.randint(1,20)
    val2=random.randint(1,4)
    
    if val <10:
        if val2==1:
            archivo.write('C00'+str(val)+'\n')
        elif val2==2:
            archivo.write('B00'+str(val)+'\n')
        elif val2==3:
            archivo.write('P00'+str(val)+'\n')
        elif val2==4:
            archivo.write('G00'+str(val)+'\n')
    else:
        if val2==1:
            archivo.write('C0'+str(val)+'\n')
        elif val2==2:
            archivo.write('B0'+str(val)+'\n')
        elif val2==3:
            archivo.write('P0'+str(val)+'\n')
        elif val2==4:
            archivo.write('G0'+str(val)+'\n')

#Llenar nombres
lineas=archivo.readlines()
for linea in lineas:
	if 'C' in linea:
		nombres.write("Camiseta\n")
	elif 'P' in linea:
		nombres.write("Pantalon\n")
	elif 'G' in linea:
		nombres.write("Gorra\n")
	elif 'B' in linea:
		nombres.write("Blusa\n")


#Llenar la cantidad de ropa de la venta
for i in range (1500):
	cantidad.write(str(random.randint(1,3))+'\n')


#Llenar los colores
for i in range(1500):
	val=random.randint(1,10)
	if val==1:
		colores.write("Negro\n")
	elif val==2:
		colores.write("Blanco\n")
	elif val==3:
		colores.write("Gris\n")
	elif val==4:
		colores.write("Amarillo\n")
	elif val==5:
		colores.write("Rojo\n")
	elif val==6:
		colores.write("Verde\n")
	elif val==7:
		colores.write("Beige\n")
	elif val==8:
		colores.write("Cafe\n")
	elif val==9:
		colores.write("Rosado\n")
	elif val==10:
		colores.write("Azul\n")	

#llenar las tallas
lineas=archivo.readlines()
for i in lineas:
	val=random.randint(1,5)
	
	if 'P' in i:
		if val==1:
			talla.write('30\n')
		elif val==2:
			talla.write('32\n')
		elif val==3:
			talla.write('34\n')
		elif val==4:
			talla.write('28\n')
		elif val==5:
			talla.write('36\n')
	else:
		if val==1:
			talla.write('S\n')
		elif val==2:
			talla.write('M\n')
		elif val==3:
			talla.write('L\n')
		elif val==4:
			talla.write('XS\n')
		elif val==5:
			talla.write('XL\n')

#llenar el precio
lineas=archivo.readlines()
for i in lineas:
	val=random.randint(1,5)
	if 'P' in i:
		if val==1:
			precio.write('50000'+'\n')
		elif val==2:
			precio.write('60000'+'\n')
		elif val==3:
			precio.write('45000'+'\n')
		elif val==4:
			precio.write('70000'+'\n')
		elif val==5:
			precio.write('50000'+'\n')
	else:
		if val==1:
			precio.write('35000'+'\n')
		elif val==2:
			precio.write('40000'+'\n')
		elif val==3:
			precio.write('45000'+'\n')
		elif val==4:
			precio.write('30000'+'\n')
		elif val==5:
			precio.write('50000'+'\n')


#llenar material
lineas=archivo.readlines()
for i in lineas:
	val=random.randint(1,3)
	if 'P' in i:
		if val==1:
			material.write('Jean'+'\n')
		elif val==2:
			material.write('Jean'+'\n')
		elif val==3:
			material.write('Drill'+'\n')
	elif 'G' in i:
		if val==1:
			material.write('Corduroy'+'\n')
		elif val==2:
			material.write('Algodon'+'\n')
		elif val==3:
			material.write('Poliester'+'\n')
	else:
		if val==1:
			material.write('Licra'+'\n')
		elif val==2:
			material.write('Algodon'+'\n')
		elif val==3:
			material.write('Poliester'+'\n')

#MIdProducto 
for i in lineas:
	val=random.randint(1,3)
	if 'P' in i:
		iDprod.write('3'+'\n')
	elif 'G' in i:
		iDprod.write('4'+'\n')
	elif 'B' in i:
		iDprod.write('2'+'\n')
	else:
		iDprod.write('1'+'\n')



#IdMAterial

lineas=material.readlines()
for i in lineas:
	print ('hola',str(i))
	if i=='Jean\n':
		idMa.write('1'+'\n')
	elif i=='Drill\n':
		idMa.write('2'+'\n')
	elif i == 'Corduroy\n' :
		idMa.write('3'+'\n')
	elif i== 'Algodon\n':
		idMa.write('4'+'\n')
	elif i== 'Poliester\n':
		idMa.write('5'+'\n')
	elif i == 'Licra\n':
		idMa.write('6'+'\n')
		


#Llenar los colores id 
lineas=colores.readlines()
for i in lineas:

	if i=="Negro\n":
		idColores.write("1\n")
	elif i =="Blanco\n":
		idColores.write("2\n")
	elif i =="Gris\n":
		idColores.write("3\n")
	elif i =="Amarillo\n":
		idColores.write("4\n")
	elif i =="Rojo\n":
		idColores.write("5\n")
	elif i =="Verde\n":
		idColores.write("6\n")
	elif i =="Beige\n":
		idColores.write("7\n")
	elif i =="Cafe\n":
		idColores.write("8\n")
	elif i =="Rosado\n":
		idColores.write("9\n")
	elif i =="Azul\n":
		idColores.write("10\n")

'''
#Ventas
"""
for i in range (1500):
	ciudad=random.randint(1,6)
	pago= random.randint(1,2)

	if ciudad==1:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Medellin,0\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Medellin,0\n')

	elif ciudad==2:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Cali,7000\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Cali,7000\n')

	elif ciudad==3:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Pereira,5000\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Pereira,5000\n')


	elif ciudad==4:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Sabaneta,2000\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Sabaneta,2000\n')


	elif ciudad==5:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Bello,2000\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Bello,2000\n')


	elif ciudad==6:
		if pago == 1:
			venta.write(str(pago)+',Contraentrega,'+str(ciudad)+',Bogota,8000\n')
		elif pago== 2:

			venta.write(str(pago)+',Consignacion,'+str(ciudad)+',Bogota,8000\n')

"""
print ("hola")

#colores.close()
#cantidad.close()
#nombres.close()
#archivo.close()
