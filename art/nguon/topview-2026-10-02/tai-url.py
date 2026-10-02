"""Tải một ảnh Topview theo link ký sẵn và ghi lại vào tai-url.log. Dùng: python tai-url.py <tên tệp không đuôi> "<url>" """
import sys, urllib.request
ten, url = sys.argv[1], sys.argv[2]
urllib.request.urlretrieve(url, ten + '.png')
open('tai-url.log', 'a', encoding='utf-8').write(ten + '\t' + url + '\n')
print('da tai', ten)
