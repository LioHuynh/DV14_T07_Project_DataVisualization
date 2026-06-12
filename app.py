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
        .stApp, [data-testid="stAppViewContainer"] {background: #03071a !important;}
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

# 4. End-of-page credits — shows in the scroll space below the dashboard
st.markdown(
    """
    <div style="max-width:760px; margin:0 auto; padding:2rem 1.5rem 4rem; text-align:center;
                font-family:Inter, ui-sans-serif, system-ui, sans-serif;
                color:rgba(160,205,240,0.75); line-height:1.75;">

        <div style="width:180px; height:2px; margin:0 auto 1.6rem;
                    background:linear-gradient(90deg, transparent, #22d3ee 30%, #a78bfa 70%, transparent);
                    box-shadow:0 0 12px rgba(34,211,238,.5);"></div>

        <p style="color:#67e8f9; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
                  font-size:.8rem; margin-bottom:1.4rem;">
            &#10081; Since you have reached the far end, there's nothing here &#10081;
        </p>

        <p style="margin:0;">
            <strong style="color:#aef0ff;">Course</strong> &middot; 2026-HS1-COS30045 &mdash; Data Visualisation<br>
            <strong style="color:#aef0ff;">Team</strong> &middot; DV14T07<br>
            <strong style="color:#aef0ff;">Tutor</strong> &middot; Raihaneh Aghaie<br>
            <strong style="color:#aef0ff;">Contributors</strong> &middot; Khang Huynh (Lio), Viet Nguyen (David)<br>
            # <strong style="color:#aef0ff;">Submission Date</strong> &middot; 12th June 2026
        </p>

        <p style="margin:1.5rem 0 .4rem; color:#67e8f9; font-weight:800; letter-spacing:.08em;
                  text-transform:uppercase; font-size:.74rem;">Contribution</p>
        <p style="margin:0;">
            <strong style="color:#aef0ff;">Raihaneh</strong> &mdash; Logical concept (p), design concept (p), data concept (p)<br>
            <strong style="color:#aef0ff;">Lio</strong> &mdash; Website design, development, logical design, Design book (p)<br>
            <strong style="color:#aef0ff;">David</strong> &mdash; Design book, logical concept (p), design concept (p)
        </p>

        <p style="margin-top:1.6rem; font-size:.72rem; opacity:.7; font-style:italic;">p: part of work</p>
    </div>
    """,
    unsafe_allow_html=True,
)
