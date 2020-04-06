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
