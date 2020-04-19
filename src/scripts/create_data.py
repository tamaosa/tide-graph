import fetch_tidedata
import os
import csv
import json
from datetime import datetime


def create_tidedata(year):
    with open('public/point.csv', 'r') as data:
        reader = csv.reader(data)
        for row in reader:
            print(row)
            tidedata = fetch_tidedata.extract_year(
                year, row[0], float(row[2]), float(row[3]))
            for month in range(1, 13):
                datadir = 'public/data/' + str(year) + '/' + str(month)
                os.makedirs(datadir, exist_ok=True)
                with open(datadir + '/' + row[0] + '.json', 'w') as f:
                    month_list = [key for key in tidedata.keys() if datetime.strptime(
                        key, "%Y/%m/%d").month == month]
                    month_data = {}
                    month_data["point"] = row[0]
                    month_data["name"] = row[1]
                    month_data["lat"] = float(row[2])
                    month_data["lon"] = float(row[3])
                    month_data["data"] = {key: tidedata[key]
                                          for key in month_list}
                    json.dump(
                        month_data, f, ensure_ascii=False, indent=None)


def cretate_pointdata():
    with open('public/point.csv', 'r') as data:
        with open('src/point.json', 'w') as f:
            pointdata = {}
            namelist = []
            region = {}
            region["list"] = ["北海道北西部", "北海道東部", "北海道南西部", "東北地方北部", "東北地方南部", "関東地方・伊豆諸島",
                              "東海地方", "北陸地方東部", "北陸地方西部", "近畿地方", "中国地方", "四国地方", "関門海峡", "九州地方北部", "九州地方南部", "南西諸島"]
            region["point"] = ["hokkaidou_northwest", "hokkaidou_east",
                               "hokkaidou_southwest", "touhoku_north", "touhoku_south", "kantou_izu", "toukai", "hokuriku_east", "hokuriku_west", "kinki", "chuugoku", "shikoku", "kaimon", "kyuusyuu_north", "kyuusyuu_south", "nansei"]
            region["lat"] = [45.4, 43.35, 42.35,
                             40.83333333, 38.4, 35.65, 34.73333333, 37.93333333, 36.61666667, 34.65, 35.55, 33.5, 33.95, 33.61666667, 31.6, 26.21666667]
            region["lon"] = [141.6833333, 145.5833333,
                             140.95, 140.7666667, 141.2666667, 139.7666667, 137.3166667, 139.0666667, 136.6, 135.4333333, 133.25, 133.5666667, 130.95, 130.4, 130.5666667, 127.6666667]

            for str in region["list"]:
                region[str] = []
            reader = csv.reader(data)
            for row in reader:
                data = {}
                data["point"] = row[0]
                data["name"] = row[1]
                data["lat"] = float(row[2])
                data["lon"] = float(row[3])
                pointdata[row[1]] = data
                namelist.append(row[1])
                region[row[4]].append(row[1])
            pointdata["list"] = namelist
            pointdata["region"] = region

            json.dump(pointdata, f, ensure_ascii=False, indent=None)


if __name__ == "__main__":
    create_tidedata(2020)
  # cretate_pointdata()
