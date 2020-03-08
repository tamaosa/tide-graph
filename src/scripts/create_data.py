import fetch_tidedata
import csv
import json


def create_tidedata():
    with open('public/point.csv', 'r') as data:
        reader = csv.reader(data)
        for row in reader:
            print(row)
            with open('public/data/' + row[0] + '.json', 'w') as f:
                tidedata = fetch_tidedata.fetch_tidedata_2month(
                    row[0], row[1], float(row[2]), float(row[3]))
                json.dump(tidedata, f, ensure_ascii=False, indent=None)


def cretate_pointdata():
    with open('public/point.csv', 'r') as data:
        with open('src/point.json', 'w') as f:
            pointdata = {}
            namelist = []
            region = {}
            region["list"] = ["北海道北西部", "北海道東部", "北海道南西部", "東北地方北部", "東北地方南部", "関東地方・伊豆諸島",
                              "東海地方", "北陸地方東部", "北陸地方西部", "近畿地方", "中国地方", "四国地方", "関門海峡", "九州地方北部", "九州地方南部", "南西諸島", "父島・南鳥島"]
            for str in region["list"]:
                region[str] = []
            reader = csv.reader(data)
            for row in reader:
                data = {}
                data["point"] = row[0]
                data["lat"] = float(row[2])
                data["lon"] = float(row[3])
                pointdata[row[1]] = data
                namelist.append(row[1])
                region[row[4]].append(row[1])
            pointdata["list"] = namelist
            pointdata["region"] = region

            json.dump(pointdata, f, ensure_ascii=False, indent=None)


if __name__ == "__main__":
    create_tidedata()
    # cretate_pointdata()
