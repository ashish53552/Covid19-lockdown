import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import xlrd
from collections import OrderedDict
from datetime import datetime
from datetime import timedelta  
import sys
import json
import re
input_file=sys.argv[1]
data=json.loads(input_file)

#    Unnamed: 0       City  Cases
# 0           0     Mumbai    830
# 1           1      Delhi    366
# 2           2  Bangalore    816
# 3           3  Hyderabad    984
# 4           4  Ahmedabad    459
#    Unnamed: 0   City1      City2 Distance in Km
# 0           0  Mumbai      Delhi       1,421.30
# 1           1  Mumbai  Bangalore          982.7
# 2           2  Mumbai  Hyderabad          709.1
# 3           3  Mumbai  Ahmedabad          530.9
# 4           4  Mumbai    Chennai       1,335.80
#                 City  Population-2011  Population-2001              State
# 0             Mumbai         12442373         11978450        Maharashtra
# 1              Delhi         11007835          9879172              Delhi
# 2          Bangalore          8436675          4301326          Karnataka
# 3          Hyderabad          6809970          3637483          Telangana
# 4          Ahmedabad          5570585          3520085            Gujarat
# 5            Chennai          4681087          4343645         Tamil Nadu
# 6            Kolkata          4486679          4572876        West Bengal
# 7              Surat          4467797          2433835            Gujarat
casesData=pd.read_csv("./Dataset/sample.csv") # contains all the cases in all districts of india at a particular date
distanceData=pd.read_csv("./Dataset/distance.csv") # contains the distance between the cities
cities=pd.read_excel("./Dataset/cities.xlsx") #condtains the populaiton wise sorted cites 50 at max
src="./Dataset/"
delhi=pd.read_excel(src+"Delhi.xlsx")
ahmedabad=pd.read_excel(src+"Ahmedabad.xlsx")
mumbai=pd.read_excel(src+"Mumbai.xlsx")
surat=pd.read_excel(src+"Surat.xlsx")
pune=pd.read_excel(src+"Pune.xlsx")
dateTimeSeries=OrderedDict()
dateTimeSeries={}
citieslist=['Mumbai','Delhi','Ahmedabad','Surat','Pune']
citiesInLockdown=[]
if data['input_params']['delhi']!="0":
    citiesInLockdown.append("Delhi")
if data['input_params']['mumbai']!="0":
    citiesInLockdown.append("Mumbai")
if data['input_params']['pune']!="0":
    citiesInLockdown.append("Pune")
if data['input_params']['ahmedabad']!="0":
    citiesInLockdown.append("Ahmedabad")
if data['input_params']['surat']!="0":
    citiesInLockdown.append("Surat")
print(data['input_params'])
populationList=[12442373,11007835,5570585,4467797,311431]
diffusion=int(data['diffusion'])  #Set if u want diffusion or not
n=5
for i in citieslist:
  dateTimeSeries[i]={}

towhichweek=int(data['weeks'])
cpr = [[0 for i in range(5)] for j in range(7*towhichweek)]
today=datetime.now()
today1=today
print(today)
k=1
dateTimeSeries['Delhi']['yhat']=delhi[delhi['ds']>today]['yhat'].to_list()
dateTimeSeries['Delhi']['yhat_lower']=delhi[delhi['ds']>today]['yhat_lower'].to_list()
dateTimeSeries['Delhi']['yhat_upper']=delhi[delhi['ds']>today]['yhat_upper'].to_list()
dateTimeSeries['Delhi']['ds']=str(delhi[delhi['ds']>today]['ds'].to_list())
dateTimeSeries['Ahmedabad']['yhat']=ahmedabad[ahmedabad['ds']>today]['yhat'].to_list()
dateTimeSeries['Ahmedabad']['yhat_lower']=ahmedabad[ahmedabad['ds']>today]['yhat_lower'].to_list()
dateTimeSeries['Ahmedabad']['yhat_upper']=ahmedabad[ahmedabad['ds']>today]['yhat_upper'].to_list()
dateTimeSeries['Ahmedabad']['ds']=str(ahmedabad[ahmedabad['ds']>today]['ds'].to_list())
dateTimeSeries['Mumbai']['yhat']=mumbai[mumbai['ds']>today]['yhat'].to_list()
dateTimeSeries['Mumbai']['yhat_lower']=mumbai[mumbai['ds']>today]['yhat_lower'].to_list()
dateTimeSeries['Mumbai']['yhat_upper']=mumbai[mumbai['ds']>today]['yhat_upper'].to_list()
dateTimeSeries['Mumbai']['ds']=str(mumbai[mumbai['ds']>today]['ds'].to_list())
dateTimeSeries['Pune']['yhat']=pune[pune['ds']>today]['yhat'].to_list()
dateTimeSeries['Pune']['yhat_lower']=pune[pune['ds']>today]['yhat_lower'].to_list()
dateTimeSeries['Pune']['yhat_upper']=pune[pune['ds']>today]['yhat_upper'].to_list()
dateTimeSeries['Pune']['ds']=str(pune[pune['ds']>today]['ds'].to_list())
dateTimeSeries['Surat']['yhat']=surat[surat['ds']>today]['yhat'].to_list()
dateTimeSeries['Surat']['yhat_lower']=surat[surat['ds']>today]['yhat_lower'].to_list()
dateTimeSeries['Surat']['yhat_upper']=surat[surat['ds']>today]['yhat_upper'].to_list()
dateTimeSeries['Surat']['ds']=str(surat[surat['ds']>today]['ds'].to_list())
print(cpr)
if diffusion:
  for day in range(7*towhichweek):
    for j in range(0,n):
        for l in range(j+1,n):
          #  print(topcities[j],topcities[l])
            #& distanceData['City2']==topcities[l]]['Distance in Km']
            if citieslist[j] in citiesInLockdown:
              continue
            if citieslist[l] in citiesInLockdown:
              continue
            #print(citieslist[l],citieslist[j])
            dis=distanceData[distanceData['City1']==citieslist[j]][distanceData['City2']==citieslist[l]]['Distance in Km'].values[0]
            dis=dis.replace(',','')
            dis=float(dis)
            # print(dis)
            cj=dateTimeSeries[citieslist[j]]['yhat']
            cl=dateTimeSeries[citieslist[l]]['yhat']
            change=k*(cj[day]-cl[day])/dis
            # print(change)
          #  print(change)
            #print(k)
            cpr[day][j]-=change
            cpr[day][l]+=change
            #print(cj[day+1])
            cj[day+1]-=change
            cl[day+1]+=change
            #print(cj[day+1])
            today=today+timedelta(days=1)
    k+=1
dateTimeSeries['cpr']={}
dateTimeSeries['cpr']['changes']=cpr
dateTimeSeries['cpr']['citiesList']=citieslist
dateTimeSeries['cpr']['citiesInLockdown']=citiesInLockdown
dateTimeSeries['week']=towhichweek
f = open("Intermediate/returns.txt", "w")
f.write(json.dumps(dateTimeSeries))
f.close()
# result=pd.DataFrame()
# result['cpr']=cpr
# result['citieslist']=citieslist
# print(result)
# ax=sns.barplot(data=result,x='cpr',y='citieslist',palette="Set3")
# ax.set(xlabel='cases on 7th day', ylabel='cities', title='')
# plt.show()