import streamlit as st

css = open("style.css").read()
js = open("script.js").read()
html = open("index.html").read()

final_html = f"""
<style>{css}</style>
{html}
<script>{js}</script>
"""

st.components.v1.html(final_html, height=1000, scrolling=True)
