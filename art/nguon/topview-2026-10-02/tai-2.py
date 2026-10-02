"""Tải ba ảnh đợt hai 02/10/2026 (quán trà đá, cảnh chạy đêm, bà bán trà) từ Topview. Link ký sẵn, hết hạn sau vài ngày. Chạy: python tai-2.py"""
import urllib.request

G = 'https://du9d8548ooqnc.cloudfront.net/analyzed_video%2Ftask%2Fobject_replace_llm%2F'
ANH = {
    'char-ba-tra': ('20c802d998594f239d0ab25436c029a7', 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vKi9hbmFseXplZF92aWRlbyUyRnRhc2slMkZvYmplY3RfcmVwbGFjZV9sbG0lMkYyMGM4MDJkOTk4NTk0ZjIzOWQwYWIyNTQzNmMwMjlhNyUyRjAucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkxNzYzMTk5fX19XX0_', 'J1e7pzIfQzJ6y4L1~3cO7~gFBJs7dDUKD4ZVQdRA7jlXTyGRgSW6Mdi3g7r8yF7b4zXuKzNcJJlXnSmAyka68oGBc-P5bDSeLjcHhMXt3IAmjY6HmuL4XjoHuL2KFKfE3rgUe1S-lN03eUS3uto5VKn1JvLT2A3YzZiW0e6kqlXbAjRs2W4lsQGW~PxFK89ZQOB1LXeG6WPHz~1TqVC7p1TyZXRviKGLyuhZfxb0i1hF55JLYvqgVBpVzn2rpVyTFzRy7HTmAW71dwrgfMWSKFrUTMde38qMiBeNQ-B~n2v1kWkLhNqpUmOoMQwBKgwKzxJhPjdKNE-JoQjBR0cn-A__'),
    'cg-chay-dem': ('aed7c9b33b234aa39e92b69301c9bb40', 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vKi9hbmFseXplZF92aWRlbyUyRnRhc2slMkZvYmplY3RfcmVwbGFjZV9sbG0lMkZhZWQ3YzliMzNiMjM0YWEzOWU5MmI2OTMwMWM5YmI0MCUyRjAucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkxNzYzMTk5fX19XX0_', 'CIzI16I1uy3ZlWEu63xFfhfUUZCPq3rlkX-jIDEBvfybAqrUKo7ZqB9UT6hexYSrqP97Mk1hy3efkCSMFNMNsuEsXyQwKnhZeaZmEtz3c9yfBGkRxxze-qEjTy4lyD5mpYmyWwYENPaEiSHD6mSnlCBxLPjB7bJ2xfq7kX3~I0t26lw8OZYU0Md8O1tb8y9WCcj~8H7FcEYnf~1Dfwahyxt5kWGmilcvMsV78SJlNkay~BbVn1mllKAEzcMWoWKgiQ5Zz6t~87J56dh8Q8QpoMOdASs~iSq9vCYnfQkHIYulbToPo8U-OIc2DaP8r9~J~lXIW8-NJHR2an9CUeUSvw__'),
    'bg-tra-da': ('53d847095e1d4d5aa02afc9e8c970483', 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vKi9hbmFseXplZF92aWRlbyUyRnRhc2slMkZvYmplY3RfcmVwbGFjZV9sbG0lMkY1M2Q4NDcwOTVlMWQ0ZDVhYTAyYWZjOWU4Yzk3MDQ4MyUyRjAucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkxNzYzMTk5fX19XX0_', 'hbR87W6nFkr9L6ZUgmhjNveCD-yVVm~Sv4k-rZOn10ORjEA8keVF2zLu57djhagfBdg4fQJXA17ffWlLKBJzEa9oSEb3WH~2EskT8DGDfEWAlwqVX8ZeDf5U1IYbLbS1yInTowqLltX0grvPGAf3QlzGkESwNoHGp1982Mi-4zpU~vFEWg3zYVVTII3iIXFHnAamBmKApqn6HW3LRme4i7Y2XcBWFNZzsbuleN33AMiSNRXWeESfxVwB7AcOpn0dME9tOPAlL-Wv5coyzppCfTvPxuAl-DYKvE4Vm8bFeVcS2JtlJRRwVfECHkpOlbWoJzjTgEnd8rmoSbINrqoKpw__'),
}
for ten, (thu_muc, policy, chu_ky) in ANH.items():
    url = f'{G}{thu_muc}%2F0.png?Policy={policy}&Signature={chu_ky}&Key-Pair-Id=K1PJBMEIA4Y1WS'
    urllib.request.urlretrieve(url, ten + '.png')
    print('da tai', ten)
