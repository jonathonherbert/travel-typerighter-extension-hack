export default `
.Controls__row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
}

.Controls__row + .Controls__row {
  padding-top: 0;
  padding-bottom: 4px;
}

.Controls__label {
  font-weight: normal;
  cursor: pointer;
  width: 100%;
}

.Controls__error-message {
  color: red;
  padding: 8px;
  padding-bottom: 0;
  font-size: 0.8em;
}

#sidebar {
  border-radius: 4px;
  border: 1px solid #ddd;
}

.Sidebar__container {
  font-size: 0.8em;
}

.Sidebar__content {
  overflow-y: scroll;
}

.Sidebar__section {
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: 100%;
  overflow: hidden;
  font-size: 15px;
}

.Sidebar__section--is-closed {
  background: none;
  border: 0;
}

.Sidebar__container + .Sidebar__container {
  margin-top: 8px;
}

.Sidebar__header-container {
  position: relative;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.Sidebar__header-bottom {
  display: flex;
  margin-top: 8px;
}

.Sidebar__header-contact {
  margin-left: auto;
  font-size: 0.8em;
  max-width: 130px;
}

.Sidebar__header {
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0.2;
  font-weight: bold;
  justify-content: space-between;
}

.Sidebar__header-button-container {
  position: relative;
}

.Sidebar__header-change-indicator {
  position: absolute;
  right: -4px;
  bottom: 22px;
  width: 10px;
  height: 10px;
  background-image: radial-gradient(closest-corner at 4px 4px, #3dcde6 0%, #01adee 100%);
  border-radius: 50%;
  display: inline-block;
  z-index: 1;
}

.Sidebar__filter-toggle {
  display: inline-block;
  padding: 1px 2px;
  vertical-align: middle;
  border-radius: 3px;
  min-width: 30px;
  font-weight: bold;
  height: fit-content;
  margin-right: 4px;
  font-size: 15px;
  cursor: pointer;
}

.Sidebar__filter-toggle:focus {
  outline: none;
}

.Sidebar__filter-toggle:disabled {
  cursor: not-allowed;
}

.Sidebar__header-sort {
  font-weight: normal;
}

.Sidebar__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.Sidebar__awaiting-match {
  padding: 8px;
  color: gray;
}

.Sidebar__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.Sidebar__list-item + .Sidebar__list-item {
  border-top: 1px solid #ddd;
}

.LoadingBar {
  position: absolute;
  height: 3px;
  left: 0;
  bottom: 0;
  background-color: #01adee;
  width: 100%;
  transition: width 0.3s, opacity 0.3s;
}

.LoadingBar__animated-background {
  animation-duration: 1.75s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0) 20%);
  background-size: 800px 104px;
  height: 100%;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
.SidebarMatch__container {
  padding: 8px;
}

.SidebarMatch__container:hover {
  background-color: #f6f6f6;
}

.SidebarMatch__header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.SidebarMatch__header-label {
  display: flex;
  width: 100%;
}

.SidebarMatch__header-match-text {
  margin-bottom: 4px;
  cursor: pointer;
}

.SidebarMatch__header-description {
  font-size: 0.8em;
  color: #5f5e5e;
}

.SidebarMatch__header-group {
  margin-left: auto;
  display: flex;
}

.SidebarMatch__header-range,
.SidebarMatch__header-category {
  text-align: right;
  font-size: 0.8em;
}

.SidebarMatch__header-category {
  margin-top: 2px;
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.3px;
  color: #999999;
}

.SidebarMatch__header-range {
  color: grey;
  white-space: nowrap;
}

.SidebarMatch__header-toggle-status {
  min-width: 20px;
  color: grey;
  text-align: right;
}

.SidebarMatch__suggestion-list {
  margin-top: 4px;
}

.SidebarMatch__list-title {
  font-style: italic;
  margin-bottom: 4px;
}

.SidebarMatch__subset-list {
  border-left: 10px solid #ddd;
  margin: 0;
}

.SidebarMatch__subset-list:first-child {
  border-top: 1px solid #ddd;
}

.SidebarMatch__group-container {
  margin: 0;
}

.Suggestion {
  padding: 8px;
  border-radius: 3px;
}

.Suggestion__matched-text {
  display: inline-block;
  position: relative;
  font-weight: normal;
}

.Suggestion__arrow {
  font-weight: normal;
  display: inline-block;
  position: relative;
  top: 1px;
}

.Suggestion__matched-text .Suggestion__diff-added {
  font-weight: bold;
}

.Suggestion {
  display: block;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  background-color: #228816;
}

.Suggestion:nth-child(even) {
  background-color: #207f15;
}

.Suggestion:hover {
  color: #fff;
  background-color: #1e7014;
}

.Suggestion + .Suggestion {
  margin-top: 3px;
}

.WikiSuggestion__container {
  display: flex;
}

.WikiSuggestion__container + .WikiSuggestion__container {
  margin-top: 1em;
}

.WikiSuggestion__text {
  flex: 1;
  padding-right: 5px;
}

.WikiSuggestion__suggestion {
  padding: 8px 8px 8px 0;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  cursor: pointer;
}

.WikiSuggestion__suggestion:hover {
  background-color: transparent;
  color: white;
}

.WikiSuggestion__thumbnail {
  position: relative;
  height: 123px;
  width: 95px;
  background-size: cover;
  background-color: #fff;
}

.WikiSuggestion__thumbnail.WikiSuggestion__thumbnail--placeholder {
  overflow: hidden;
}

.WikiSuggestion__thumbnail.WikiSuggestion__thumbnail--placeholder::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  width: 500%;
  margin-left: -250%;
  animation: placeholderAnimation 0.8s linear infinite;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0) 54%) 50% 50%;
}

.WikiSuggestion__extract {
  position: relative;
  height: 85px;
  overflow: hidden;
  font-size: 0.8em;
}

.WikiSuggestion__link {
  position: absolute;
  bottom: -1px;
  right: 0;
  height: 13px;
  width: 13px;
  display: block;
  background-position: center right;
  background-repeat: no-repeat;
  background-image: linear-gradient(transparent, transparent), url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22%3E %3Cpath fill=%22%23fff%22 stroke=%22%2336c%22 d=%22M1.5 4.518h5.982V10.5H1.5z%22/%3E %3Cpath fill=%22%2336c%22 d=%22M5.765 1H11v5.39L9.427 7.937l-1.31-1.31L5.393 9.35l-2.69-2.688 2.81-2.808L4.2 2.544z%22/%3E %3Cpath fill=%22%23fff%22 d=%22M9.995 2.004l.022 4.885L8.2 5.07 5.32 7.95 4.09 6.723l2.882-2.88-1.85-1.852z%22/%3E %3C/svg%3E");
}

.WikiSuggestion__extract--placeholder {
  background: repeating-linear-gradient(180deg, #fff, #fff 11px, #fff 11px, #fff 18px);
  position: relative;
  height: 85px;
  overflow: hidden;
}

.WikiSuggestion__extract--placeholder::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  width: 500%;
  margin-left: -250%;
  animation: placeholderAnimation 0.8s linear infinite;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0) 54%) 50% 50%;
}

@keyframes placeholderAnimation {
  0% {
    transform: translate3d(-30%, 0, 0);
  }
  100% {
    transform: translate3d(30%, 0, 0);
  }
}
.SuggestionList__see-more {
  margin: 5px 0;
  text-align: center;
}

.MatchWidget {
  background-color: white;
  display: block;
  position: relative;
  padding: 12px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: normal;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.18);
  border-radius: 3px;
  width: 300px;
  transition: opacity 0.1s, transform 0.1s;
  transform: translate3d(0, -3px, 0);
  z-index: 100;
  overflow: hidden;
}

.MatchWidget__container {
  /**
   * We provide padding here to distance the MatchWidget tooltip
   * from the decoration it's attached to. The value is 15px, but
   * the distance the user sees is ~10px, as we ask our tooltip
   * library to offset its positioning by -5px.
   *
   * This ensures that there's no gap between the tooltip and the
   * decoration when the user moves their mouse from the decoration
   * to the tooltip. If there's a gap, the tooltip library detects a
   * mouseleave event and closes the tooltip prematurely.
   *
   * We align the tooltip to the left by default,
   */
  padding: 11px 0px;
  position: relative;
  font-size: 15px;
}

.MatchWidget__container--is-hovering .MatchWidget {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.MatchWidget__type {
  color: #999999;
  font-variant: small-caps;
  line-height: 0.7;
  text-transform: lowercase;
  letter-spacing: 0.3px;
}

.MatchWidget__suggestion {
  padding: 8px;
}

.MatchWidget__type {
  padding-bottom: 8px;
}

.MatchWidget__annotation {
  padding-top: 8px;
}

.MatchWidget__annotation p {
  margin: 0;
}

.MatchWidget__color-swatch {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 5px;
  border-radius: 8px;
}

.MatchWidget__label {
  display: block;
  margin-bottom: 2px;
  transition: background-color 0.1s;
}

.MatchWidget__suggestion-list {
  display: block;
  margin-top: 3px;
}

.MatchWidget__suggestion {
  display: block;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  background-color: #228816;
}

.MatchWidget__suggestion:nth-child(even) {
  background-color: #207f15;
}

.MatchWidget__suggestion:hover {
  color: #fff;
  background-color: #1e7014;
}

.MatchWidget__suggestion + .MatchWidget__suggestion {
  margin-top: 3px;
}

.MatchWidget__footer {
  margin-top: 8px;
  display: flex;
  align-items: flex-end;
  width: 100%;
}

.MatchWidget__ignore-match {
  display: block;
  margin-left: auto;
  cursor: pointer;
}

.MatchWidget__ignore-match .MatchWidget__ignore-match-button {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 3px;
  font-weight: normal;
  font-size: 15px;
  color: #228816;
}

.MatchWidget__ignore-match .MatchWidget__ignore-match-text {
  margin-left: 4px;
}

.MatchWidget__ignore-match .MatchWidget__ignore-match-button:hover {
  background-color: #ece9e9;
}

.MatchWidget__ignore-match .MatchWidget__ignore-match-icon {
  font-size: 0.8em;
  padding-right: 5px;
}

.SidebarMatch__suggestion-list + .MatchWidget__ignore-match {
  margin-top: 3px;
}

.MatchWidget__feedbackLink {
  font-size: 0.8em;
}

.MatchWidget__feedbackLink a {
  color: #999999;
}

.MatchDecoration {
  border-bottom: 2px solid #3dcde6;
}

.MatchDecoration__height-marker:before {
  content: "​";
}

.MatchDecoration--is-correct {
  position: relative;
}

.MatchDecoration--is-correct:after {
  display: block;
  content: "✓";
  position: absolute;
  right: -10px;
  top: -8px;
  color: #04d514;
  font-weight: bold;
  pointer-events: none;
}

.MatchDebugDirty {
  background-color: #f7a85e66;
}

.MatchDebugInflight {
  background-color: #31a72085;
}

hr {
  height: 1px;
  border: initial;
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 5px 0;
}

.flex-align-right {
  margin-left: auto;
}

.pull-right {
  float: right;
}

.Button {
  padding: 4px 6px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  font-size: 15px;
  font-weight: normal;
  cursor: pointer;
}

.Button:hover, .Button:disabled {
  background-color: #eee;
}

.Button:disabled {
  color: #888;
}

.Button:active,
.Button:focus {
  outline: none;
}

.TyperighterPlugin__overlay {
  position: absolute;
  top: 0;
  left: 0;
}

.TyperighterPlugin__decoration-container {
  position: absolute;
}

.TyperighterPlugin__tooltip-overlay {
  position: relative;
  z-index: 10;
}
`
