import urllib.request
from datetime import datetime, date, timedelta
import ephem
import json


def convert_tidetype_into_moonage(moon_age):
    dic = {3: "中潮", 4: "中潮", 5: "中潮", 6: "中潮", 12: "中潮", 13: "中潮", 18: "中潮", 19: "中潮", 20: "中潮", 21: "中潮", 27: "中潮", 28: "中潮", 7: "小潮", 8: "小潮", 9: "小潮", 22: "小潮", 23: "小潮", 24: "小潮", 10: "長潮", 25: "長潮", 11: "若潮", 26: "若潮"
           }
    return dic.get(int(moon_age), "大潮")


def extract_1month(target_year, target_month, point, lat, lon):
    url = "https://www.data.jma.go.jp/gmd/kaiyou/data/db/tide/suisan/txt/" + \
        str(target_year) + "/" + point + ".txt"
    data = {}
    with urllib.request.urlopen(url) as response:
        for line in response:
            strline = line.decode("utf-8")
            month = int(strline[74:76].strip())
            if (month == target_month):
                date_data = {}
                year = int("20" + strline[72:74].strip())
                day = int(strline[76:78].strip())
                # point = strline[78:80]
                tidedata = strline[0:72]
                date_data["tide"] = [int(tidedata[i * 3:i * 3 + 3])
                                     for i in range(len(tidedata) // 3)]
                high_data = strline[80:108]
                high_time = [high_data[i*7:i*7 + 2] + ":" +
                             high_data[i*7+2:i*7 + 4] for i in range(2)]
                date_data["high_time"] = [
                    "--:--" if i == "99:99" else i.replace(" ", "0") for i in high_time]
                high_tide = [high_data[i * 7 + 4:i * 7 + 7] for i in range(2)]
                date_data["high_tide"] = ["--" if i == "999" else int(i)
                                          for i in high_tide]
                low_data = strline[108:136]
                low_time = [low_data[i*7:i*7 + 2] + ":" +
                            low_data[i * 7 + 2:i * 7 + 4] for i in range(2)]
                date_data["low_time"] = [
                    "--:--" if i == "99:99" else i.replace(" ", "0") for i in low_time]
                low_tide = [low_data[i * 7 + 4:i * 7 + 7] for i in range(2)]
                date_data["low_tide"] = ["--" if i == "999" else int(i)
                                         for i in low_tide]
                here = ephem.Observer()
                here.lat, here.lon = str(lat), str(lon)
                here.date = datetime(year, month, day, 3)  # noon JST
                sun = ephem.Sun()
                date_data["sunrise"] = ephem.localtime(here.previous_rising(sun)).strftime(
                    "%H:%M")
                date_data["sunset"] = ephem.localtime(here.next_setting(sun)).strftime(
                    "%H:%M")
                moon_age = here.date - ephem.previous_new_moon(here.date)
                date_data["tidetype"] = convert_tidetype_into_moonage(moon_age)
                date_data["date"] = datetime(year, month, day).strftime(
                    "%m/%d")
                data[datetime(year, month, day).strftime(
                    "%Y/%m/%d")] = date_data
    return data


def fetch_tidedata_2month(point, name, lat, lon):
    point_data = {}
    point_data["point"] = point
    point_data["name"] = name
    point_data["lat"] = lat
    point_data["lon"] = lon
    now = datetime.now()
    later = now + timedelta(days=30)
    data1 = extract_1month(now.year, now.month, point, lat, lon)
    data2 = extract_1month(later.year, later.month, point, lat, lon)
    point_data["data"] = {**data1, **data2}
    return point_data


if __name__ == "__main__":
    with open('public/test.json', 'w') as f:
        json.dump(fetch_tidedata_2month(
            "KR", "稚内", 42.59, 144.22), f, ensure_ascii=False, indent=4)

    # print(convert_tidetype_into_moonage(3.5))
