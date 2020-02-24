import fetch_tidedata
import csv
import json

with open('public/point.csv', 'r') as data:
    reader = csv.reader(data)
    for row in reader:
        print(row)
        with open('public/data/' + row[0] + '.json', 'w') as f:
            tidedata = fetch_tidedata.fetch_tidedata_2month(
                row[0], row[1], float(row[2]), float(row[3]))
            json.dump(tidedata, f, ensure_ascii=False, indent=None)
