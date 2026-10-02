"""Tải hai lớp tách từ ảnh chạy đêm (Topview Image Edit, miễn phí): nền không người và hai nhân vật trên nền magenta. Link ký sẵn, hết hạn sau vài ngày."""
import urllib.request
G = 'https://du9d8548ooqnc.cloudfront.net/analyzed_video%2Ftask%2Fobject_replace_llm%2F'
ANH = {
    'chay-dem-nv': ('695876408b56484d80b56d9ce9934f8b', 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vKi9hbmFseXplZF92aWRlbyUyRnRhc2slMkZvYmplY3RfcmVwbGFjZV9sbG0lMkY2OTU4NzY0MDhiNTY0ODRkODBiNTZkOWNlOTkzNGY4YiUyRjAucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkxNzYzMTk5fX19XX0_', 'n2t8KhAtkLmynWIx3RxtRvCnwx3yLpaPPt1mOQXkdISUbXSnW45gkC59SCsI6LPojkDCSDucz95Q5bIVMTyYny4d0~AMOuv6GuxtXIYB6hVR~hk4ltBzNyH5YDt7NgGmRtba4w4OibtpWQOkgZlp~zUAUBZUrrn2x9AEKFVYQG0C7Jwit2JiPRT-lQcnYb0nVNAhyL3O0euphQDnpmpI0qcAENcyQG0osjjLGtxoqxF6TmxL7cU7P4AC1pZyQLI7iGMUvekBImcZRT8FLQPhxBPi6cIVH7HSSqOK6v~lyH05-RNxTaOVBxzCANGF-kBbLxXVrCvzRYOnhfU-3S9wRw__'),
    'chay-dem-nen': ('3e93267122ee4d889cbac290f0839f7c', 'eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vKi9hbmFseXplZF92aWRlbyUyRnRhc2slMkZvYmplY3RfcmVwbGFjZV9sbG0lMkYzZTkzMjY3MTIyZWU0ZDg4OWNiYWMyOTBmMDgzOWY3YyUyRjAucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkxNzYzMTk5fX19XX0_', 'rzdkOkQP9tqvAUuqyRzvZc4tkNT9ZbSyQxJxbBOFJpT2Hxx48GgDIJxOnHhcLngT6JSmZyAtAhx5s6BA9tEV080QN-8f7eIjM3rFL4IjJbbV~aETfonTkDQWnymDgIsLqI2l55y9HBmc71X5DolkUvhviysR-XxJZw4tuAuXcO7Itf6VClmr3mRvJNi0NBGAf~S2vvo7uTIy524rNobMAosR~h5bVAJR8gSe2D9XTSFIs1-xgTEepKZbBBstxxYj-7zsXYnBB7pYUI8uJiH1~zAca7j~YHnzQEXXOMbABb55z293P5YqkVnE-JZe5Rshpx5VfkGhTT1MzVuBAq5wZQ__'),
}
for ten, (thu_muc, policy, chu_ky) in ANH.items():
    urllib.request.urlretrieve(f'{G}{thu_muc}%2F0.png?Policy={policy}&Signature={chu_ky}&Key-Pair-Id=K1PJBMEIA4Y1WS', ten + '.png')
    print('da tai', ten)
