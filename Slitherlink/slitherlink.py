from fltk import *
from math import *
import random





def coord_sommet(sommet):
    i, j = sommet
    return taille_marge + j * taille_case, taille_marge + i * taille_case


def grille(fichier):
    """Fonction qui transforme le fichier texte en une liste de liste des indices à afficher dans la grille
    >>> grille("grille-triviale.txt")
    [[2, 2], [2, 2]]

    """
    f = open(fichier, 'r')
    lignes = f.read()
    lignes = lignes.split()
    num = list(lignes)
    indices = []
    i = 0

    for elem in num:
        indices.append([])
        for elem2 in elem:
            if elem2 == '2' or elem2 == '0' or elem2 == '1' or elem2 == '3':
                indices[i].append(int(elem2))
            if elem2 == '_':
                indices[i].append(None)
        i += 1
    return indices


def arrange_segment(segment):
    """
    Fonction permettant d'eviter d'avoir plusieurs même segments dans état en
        mettant toujours le sommet le plus petit en premier indice
    """

    if segment[1] < segment[0]:
        segment = (segment[1], segment[0])
    return segment


def est_trace(etat, segment):
    """Fonction qui vérifie si le segment est tracé, c'est à dire si dans le dictionnaire
       etat le segment à pour valeur 1
    >>> est_trace({((2, 2), (2, 3)): 1},((2, 2),(2, 3)))
    True
    >>> est_trace({((2, 2), (2, 3)): -1},((2, 2),(2, 3)))
    False
    """
    if segment in etat and etat[segment] == 1:
        return True
    else:
        return False


def est_interdit(etat, segment):
    """Verifie la valeur de la clé segment dans etat, si elle est égale a -1 alors le segment est interdit
    >>> est_interdit({((2, 2), (2, 3)): -1},((2, 2),(2, 3)))
    True
    >>> est_interdit({((2, 2), (2, 3)): 1},((2, 2),(2, 3)))
    False
    """
    if segment in etat and etat[segment] == -1:
        return True
    else:
        return False


def est_vierge(etat, segment):
    if segment not in etat:
        return True
    else:
        return False


def tracer_segment(etat, segment):
    """Modifie le dictionnaire etat pour que le segment soit désormais tracer
    >>> tracer_segment({((2, 2), (2, 3)): -1},((2, 2),(2, 3)))
    {((2, 2), (2, 3)): 1}"""
    etat[segment] = 1
    return etat


def interdire_segment(etat, segment):
    """Modifie le dictionnaire etat pour que le segment soit désormais interdit
    >>> interdire_segment({((2, 2), (2, 3)): 1},((2, 2),(2, 3)))
    {((2, 2), (2, 3)): -1}"""
    etat[segment] = -1
    return etat


def effacer_segment(etat, segment):
    """Modifie le dictionnaire etat pour que le segment soit désormais interdit
    >>> effacer_segment({((2, 2), (2, 3)): 1},((2, 2),(2, 3)))
    {}"""
    etat.pop(segment)
    return etat


def segments_traces(etat, sommet):
    """Renvoie les segments tracer autour d'un sommet c'est à dire dont les segments reliés à ce sommet ont pour valeurs 1
    >>> segments_traces({((2, 2), (2, 3)): 1},((2,2)))
    [((2, 2), (2, 3))]"""
    segments = []
    for cle in etat.keys():
        if sommet in cle and etat[cle] == 1:
            segments.append(cle)
    return segments


def segments_interdits(etat, sommet):
    for cle in etat.keys():
        if sommet in cle and etat[cle] == -1:
            return cle


def segments_vierges(etat, sommet):
    for cle in etat.keys():
        if sommet not in cle:
            return cle


def segment_adjacents(case):
    x, y = case
    lst_seg = [((x, y), (x, y + 1)), ((x, y), (x + 1, y)), ((x + 1, y), (x + 1, y + 1)), ((x, y + 1), (x + 1, y + 1))]
    return lst_seg


def statut_case(indices, etat, case):
    x, y = case
    cmpt_seg = 0
    for seg in segment_adjacents(case):
        if est_trace(etat, seg) is True:
            cmpt_seg += 1
    if indices[x][y] is None:
        return None
    elif indices[x][y] == cmpt_seg:
        return 0
    elif indices[x][y] > cmpt_seg:
        return 'positif'
    elif indices[x][y] < cmpt_seg:
        return 'negatif'


def longueur_boucle(etat, segment):
    depart = segment[0]
    precedent = segment[0]
    courant = segment[1]
    a = 0

    while courant != depart:
        seg = segments_traces(etat, courant)
        if len(seg) != 2:
            if a == 1:
                return None
        else:
            for elem in seg:
                if elem != (precedent, courant) and elem != (courant, precedent):
                    if elem[0] == courant:
                        precedent = courant
                        courant = elem[1]
                        break


                    else:
                        precedent = courant
                        courant = elem[0]
                        break
        a+=1
    return a+1


def coord_seg(x,y):
    " permet d'obtenir le segment sur lequel on clique "
    dx = (x - taille_marge) / taille_case
    dy = (y - taille_marge) / taille_case
    if -0.2 < dx - round(dx) < 0.2 and (-0.2 > dy - round(dy) or dy - round(dy) > 0.2):
        return (int(dy), round(dx)), (int(dy) + 1, round(dx))
    if -0.2 < dy - round(dy) < 0.2 and (-0.2 > dx - round(dx) or dx - round(dx) > 0.2):
        return (round(dy), int(dx)), (round(dy), int(dx) + 1)


def victoire(indices,etat):
    for lignes in range(len(indices)):
        for colonne in range(len(indices[0])):
            statutcase=statut_case(indices,etat,(lignes,colonne))
            if statutcase!=None and statutcase!=0:
                return False

    return True




def affiche_indice(etat, indices):
    for colonne in range(len(indices)):
        for indice in range(len(indices[colonne])):
            if indices[colonne][indice] is not None:
                i, j = coord_sommet((colonne, indice))
                if statut_case(indices, etat, (colonne, indice)) == 'negatif':
                    texte(i + (sqrt(taille_case)) + taille_marge, j + (sqrt(taille_case)) + taille_marge / 2
                          , str(indices[colonne][indice]), 'red', taille=40)
                if statut_case(indices, etat, (colonne, indice)) == 0:
                    texte(i + (sqrt(taille_case)) + taille_marge, j + (sqrt(taille_case)) + taille_marge / 2
                          , str(indices[colonne][indice]), 'green', taille=40)
                if statut_case(indices, etat, (colonne, indice)) == 'positif':
                    texte(i + (sqrt(taille_case)) + taille_marge, j + (sqrt(taille_case)) + taille_marge / 2
                          , str(indices[colonne][indice]), taille=40)


def affiche_sommet():
    for colonne in range(largeur_plateau + 1):
        for ligne in range(hauteur_plateau + 1):
            pts = (taille_case * ligne + taille_marge,
                   taille_case * colonne + taille_marge)  # le point en haut à gauche de la case
            cercle(pts[0], pts[1], 3, couleur='black', remplissage='black')


def affiche_seg(etat):
    for cle, valeurs in etat.items():
        x1, y1 = coord_sommet(cle[0])
        x2, y2 = coord_sommet(cle[1])
        if valeurs == 1:
            ligne(x1, y1, x2, y2, couleur='black', epaisseur=3)
        if valeurs == -1:
            texte((x1 + x2) / 2 - 10, (y1 + y2) / 2 - 16, str('X'), couleur='red', taille=25)



def ecran_titre():
    rectangle(200,100,600,250)
    texte(340,160, "GRILLE 1", couleur="black", taille=24)

    rectangle(200,350,600,500)
    texte(340,410, "GRILLE 2", couleur="black", taille=24)

    rectangle(200,600,600,750)
    texte(340,660, "GRILLE 3", couleur="black", taille=24)
    while True:
        ev = donne_ev()
        tev = type_ev(ev)
        if tev == "ClicGauche":
            x=abscisse(ev)
            y=ordonnee(ev)
            if 200<=x<=600 and 100<=y<=250:
                return 1
                break
            if 200<=x<=600 and 350<=y<=500: 
                return 2
                break
            if 200<=x<=600 and 600<=y<=750:
                return 3
                break

        mise_a_jour()



def nbr_seg_trace(etat):
    i=0
    for valeurs in etat.values():
        if valeurs ==1:
            i+=1
    return i



taille_case = 100
taille_marge = 20



etat = {}

cree_fenetre(800,800)

ecrantitre=ecran_titre()
if ecrantitre == 1:
    indices=grille("grille1.txt")
elif ecrantitre==2:
    indices=grille("grille2.txt")
elif ecrantitre==3:
    indices=grille("grille-triviale.txt")


largeur_plateau = len(indices[0])
hauteur_plateau = len(indices)

ferme_fenetre()

cree_fenetre(taille_case * (largeur_plateau) + taille_marge * 2, taille_case * (hauteur_plateau) + taille_marge * 2)

    


while True:
    efface_tout()
    affiche_sommet()
    affiche_indice(etat,indices)
    affiche_seg(etat)
    mise_a_jour()

    nb_segment_trace=nbr_seg_trace(etat)
    ev = donne_ev()
    tev = type_ev(ev)
    if tev == "ClicGauche":
        x=abscisse(ev)
        y=ordonnee(ev)
        segment=coord_seg(x,y)
        if segment !=None:
            if segment not in etat:
                tracer_segment(etat,segment)
            else:
                effacer_segment(etat,segment)
        
    elif tev == "ClicDroit":
        x=abscisse(ev)
        y=ordonnee(ev)
        segment=coord_seg(x,y)
        if segment !=None:
            if segment not in etat:
                interdire_segment(etat,segment)
            else:
                effacer_segment(etat,segment)

    elif tev == "Quitte":
        break
        


    elif victoire(indices,etat) and longueur_boucle(etat, ((0,0),(1,0)))==nb_segment_trace:
        efface_tout()
        if indices==grille("grille-triviale.txt"):
            texte(65,95, "Bravo !",'green',taille=30)
        elif indices==grille("grille1.txt"):
            texte(210,250, "Bravo !",'green',taille=60)
        elif indices==grille("grille2.txt"):
            texte(150,200, "Bravo !",'green',taille=60)
        break
        

            
        
                

 
attend_ev()

