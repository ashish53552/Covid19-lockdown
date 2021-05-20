# import numpy as np 
# import pandas as pd
# import matplotlib.pyplot as plt
# import seaborn as sns
# import xlrd
# from collections import OrderedDict

# casesData=pd.read_csv("./Dataset/sample.csv") # contains all the cases in all districts of india at a particular date
# distanceData=pd.read_csv("./Dataset/distance.csv") # contains the distance between the cities
# cities=pd.read_excel("./Dataset/cities.xlsx") #condtains the populaiton wise sorted cites 50 at max

# n=10 #represents the number of cities we are considering in the dataset

# topcities=cities[:n]['City'].tolist()
# print(topcities)
# topcitiespopulation=cities[:n]['Population-2011'].tolist()
# #casesData[casesData['Date']==date][casesData['District']=='Bhopal']['Confirmed'].values[0] extracts a particular city cases from the main dataset
# k=1 #differential gradient constant

# #increment =k*(populationincity a - population in city b)/(distance between a and b)

# casesPerday=pd.DataFrame()
# casesPerday['cities']=topcities

# days= 7 # the day wise cases change
# cases_in_0thday=n*[0]
# casesPerday["0"]=cases_in_0thday
#     # cases in previous day
# #print(casesData)
# #print(topcities)
# #print(cities)
# # cpr=casesPerday["0"].to_list()
# # for j in range(0,n):
# #     for l in range(j+1,n):
# #         #
# #       #  print(topcities[j],topcities[l])
# #         #& distanceData['City2']==topcities[l]]['Distance in Km']
# #         dis=distanceData[distanceData['City1']==topcities[j]][distanceData['City2']==topcities[l]]['Distance in Km'].values[0]
# #         dis=dis.replace(',','')
# #         dis=float(dis)
# #         cj=casesData[casesData['City']==topcities[j]]['Cases'].values[0]
# #         cl=casesData[casesData['City']==topcities[l]]['Cases'].values[0]
# #         print(f"{topcities[j] } cases are {cj}")
# #         print(f"{topcities[l] } cases are {cl}")
# #      #   print(dis)
# #         change=k*((cj/topcitiespopulation[j])-(cl/topcitiespopulation[l]))/dis
# #       #  print(change)
# #         cpr[j]-=change
# #         cpr[l]+=change

# # casesPerday[str(days)]=cpr
# # sns.color_palette("Paired")
# # ax=sns.barplot(data=casesPerday,y='cities',x=str(days),palette="Set3")
# # ax.set(xlabel='cases on 7th day', ylabel='cities', title='')
# # plt.show()

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
# input_file=sys.argv[1]
# data=json.loads(input_file)

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
dateTimeSeries['Delhi']=delhi
dateTimeSeries['Ahmedabad']=ahmedabad
dateTimeSeries['Mumbai']=mumbai
dateTimeSeries['Pune']=pune
dateTimeSeries['Surat']=surat
citieslist=['Mumbai','Delhi','Ahmedabad','Surat','Pune']
populationList=[12442373,11007835,5570585,4467797,311431]
diffusion=1
n=5
cpr=np.empty([7,5])
towhichweek=1
today=datetime.now()
today1=today
print(today)
print()
k=1
if diffusion:
  for day in range(7*towhichweek):
    for j in range(0,n):
        for l in range(j+1,n):
          #  print(topcities[j],topcities[l])
            #& distanceData['City2']==topcities[l]]['Distance in Km']
            print(citieslist[l],citieslist[j])
            dis=distanceData[distanceData['City1']==citieslist[j]][distanceData['City2']==citieslist[l]]['Distance in Km'].values[0]
            dis=dis.replace(',','')
            dis=float(dis)
            print(dis)
            temp=dateTimeSeries[citieslist[j]]
            cj=temp[temp['ds']>today]['yhat']
            temp=dateTimeSeries[citieslist[l]]
            cl=temp[temp['ds']>today]['yhat']
            change=k*((cj.iloc[0])-(cl.iloc[0]))/dis
          #  print(change)
            cpr[day][j]-=change
            cpr[day][l]+=change
            cj.iloc[1]-=change
            cl.iloc[1]+=change
            today=today+timedelta(days=1)
# result={}
# result['weeks']=towhichweek
# for i in citieslist:
#   result[i]={}
#   temp=dateTimeSeries[i]
#   result[i]['yhat']=temp[temp['ds']>today1]['yhat'].to_list()

# f = open("Intermediate/returns.txt", "w")
# f.write(json.dumps(result))
# f.close()
# plt.plot(delhi['ds'],delhi['yhat'])
# #plt.plot(delhi['ds'],delhi['yhat_upper'])
# plt.plot(dateTimeSeries['Delhi']['ds'],dateTimeSeries['Delhi']['yhat'])
# result=pd.DataFrame()
# result['cpr']=cpr[0]
# result['citieslist']=citieslist

# ax=sns.barplot(data=result,x='cpr',y='citieslist',palette="Set3")

# print(result)
# ax.set(xlabel='cases on 7th day', ylabel='cities', title='')
plt.show()
print(cpr)