import React from 'react';
import Authors from '../components/authors.jsx';
import { render } from 'react-dom';
import { FaGithub, FaDatabase, FaYoutube, FaFilePdf } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';
import { FiDatabase } from 'react-icons/fi';
import { SiArxiv } from 'react-icons/si';
import { Icon } from '@iconify/react';

const HuggingFace = ({ size }) => (
  <Icon icon="logos:hugging-face-icon" style={{ fontSize: size }} />
);

const GoogleColab = ({ size }) => (
  <Icon icon="simple-icons:googlecolab" style={{ fontSize: size }} />
);

class ResourceBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 600,
    };
    this.icons = {
      paper: FaFilePdf,
      arxiv: SiArxiv,
      data: FaDatabase,
      code: FaGithub,
      video: FaYoutube,
      huggingface: HuggingFace,
      demo: GoogleColab,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.setState({ isMobile: window.innerWidth < 600 });
  }
  render() {
    if (!this.props.url) return null;
    const aClass = `uk-button uk-padding-remove ${this.props.rid === 0 ? 'uk-first-column' : 'uk-margin-medium-left@s uk-margin-small-left'}`;
    const sClass = 'uk-margin-small-left uk-margin-small-right uk-text-bold';
    const FaIcon = this.icons[this.props.title];
    const iTitle =
      this.props.title == 'huggingface' && this.state.isMobile
        ? ' hf '
        : this.props.title;
    return (
      <>
        <a className={aClass} href={this.props.url} target="_blank">
          <FaIcon size="2em" />
          <span className={sClass}>{iTitle}</span>
        </a>
      </>
    );
  }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleClass = `uk-${
      this.props.title.length > 15 ? 'h2' : 'h1'
    } uk-text-primary uk-text-bold`;
    return (
      <>
        <div className="uk-cover-container uk-background-secondary">
          <div className="uk-container uk-container-small uk-section">
            <div className="uk-text-center uk-text-bold">
              <p className={titleClass}>{this.props.title}</p>
              <span className="uk-label uk-label-primary uk-text-center uk-margin-small-bottom">
                {this.props.journal}
              </span>
            </div>
            <Authors
              authors={this.props.authors}
              affiliations={this.props.affiliations}
              meta={this.props.meta}
            />
            <div className="uk-flex uk-flex-center uk-margin-top">
              {Object.keys(this.props.resources).map((key, rid) => (
                <ResourceBtn
                  url={this.props.resources[key]}
                  title={key}
                  rid={rid}
                  key={'header-' + key}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
