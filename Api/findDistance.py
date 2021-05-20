import numpy as np
import pandas as pd
import xlrd
import matplotlib.pyplot as plt
import requests
import bs4

df=pd.read_excel("./Dataset/cities.xlsx")
print(df)

cities=df['City'].to_list()
print(cities)

df2=pd.DataFrame()

# for i in range(0,50):
#     for j in range(i+1,50):
#         text='distance between '+ str(cities[i])+ ' and '+ str(cities[j])
#         url= 'https://google.com/search?q=' + text
#         request_result=requests.get( url )
#         soup = bs4.BeautifulSoup(request_result.text,"html.parser")
#         temp = soup.find( "div" , class_='BNeawe' ).text 
#         data=str(temp.encode("UTF-8"))
#         left=data.find("(")
#         right=data.find(")")
#         dis=data[left+1:right-3]
#         print(dis)
#         row_df=pd.DataFrame([pd.Series([cities[i],cities[j],dis])])
#         df2=pd.concat([df2,row_df],ignore_index=True)
# df2.columns=['City1', 'City2','Distance in Km']     
# print(df2)
# df2.to_csv (r'E:\Projects\Covid19-Lockdown\Dataset\export_dataframe.csv', index = True, header=True)

for i in range(0,5):

    text='area of '+ str(cities[i])
    url= 'https://google.com/search?q=' + text
    request_result=requests.get( url )
    soup = bs4.BeautifulSoup(request_result.text,"html.parser")
    temp = soup.find( "div" , class_='BNeawe' ).text 
    data=str(temp.encode("UTF-8"))
    left=data.find("'")
    right=data.find("\\")
    area=data[left+1:right]
    print(area)
    row_df=pd.DataFrame([pd.Series([cities[i],area])])
    print(row_df)

df2.columns=['City','Area']    
#df2=pd.concat([df2,row_df],ignore_index=True)
print(df2)


#     row_df=pd.DataFrame([pd.Series([cities[i],cities[j],dis])])
#     df2=pd.concat([df2,row_df],ignore_index=True)
 
# print(df2)
# df2.to_csv (r'E:\Projects\Covid19-Lockdown\Dataset\export_dataframe.csv', index = True, header=True)