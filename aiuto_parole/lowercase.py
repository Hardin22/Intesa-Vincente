parole_da_trasformare_in_minuscolo = """ 
Lago
Coperta

"""
# """
parole_da_trasformare_in_minuscolo = parole_da_trasformare_in_minuscolo.split()
parole_da_trasformare_in_minuscolo = [parola.lower() for parola in parole_da_trasformare_in_minuscolo]
parole_da_trasformare_in_minuscolo = "\n".join(parole_da_trasformare_in_minuscolo)
print(parole_da_trasformare_in_minuscolo)
