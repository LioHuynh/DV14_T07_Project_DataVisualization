import streamlit as st
import streamlit.components.v1 as components
import pandas as pd

# 1. Page config
st.set_page_config(
    layout="wide",
    page_title="Road Crash Data Cube",
    initial_sidebar_state="collapsed",
)

# 2. Strip Streamlit's chrome and padding so the cube fills the page
st.markdown(
    """
    <style>
        header {visibility: hidden;}
        #MainMenu {visibility: hidden;}
        .block-container {padding: 0rem !important; max-width: 100% !important;}
        [data-testid="stAppViewContainer"] {padding: 0 !important;}
        iframe {width: 100% !important;}
    </style>
    """,
    unsafe_allow_html=True,
)


@st.cache_data
def get_html():
    # --- Load page assets ---
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()
    with open("script.js", "r", encoding="utf-8") as f:
        js = f.read()

    # --- Load BOTH datasets and serialise to JSON ---
    merged_json = pd.read_csv("mergedData.csv").to_json(orient="records")
    sex_json = pd.read_csv("sexByRoadUser.csv").to_json(orient="records")

    # --- Inject the stylesheet inline ---
    html = html.replace(
        '<link rel="stylesheet" href="style.css">',
        f"<style>{css}</style>",
    )

    # --- Replace BOTH d3.csv() fetches with the embedded data ---
    # (the iframe can't fetch local files, so we hand the data straight to the script)
    js = js.replace('d3.csv("mergedData.csv")', f"Promise.resolve({merged_json})")
    js = js.replace('d3.csv("sexByRoadUser.csv")', f"Promise.resolve({sex_json})")

    # --- Inject the script inline ---
    html = html.replace(
        '<script src="script.js"></script>',
        f"<script>{js}</script>",
    )

    return html


# 3. Render the full dashboard.
# scrolling=False => the iframe has NO inner scrollbar, so only the page scrolls (one scrollbar).
# height must be tall enough to show the whole dashboard; any extra just shows more of the
# starfield background, so err on the generous side rather than clipping the footer.
components.html(get_html(), height=1250, scrolling=False)
