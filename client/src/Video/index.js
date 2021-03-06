import React from 'react';
import 'twitch-embed';
import TwitchEmbed from '../TwitchEmbed';
import ReactDOM from 'react-dom';
import utils from '../utils';

/** Video
 * this is a container component for showing a twitch vod highlight.
 * it will remove and replace the child TwitchEmbed when the user sorts differently.
 */
class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.addNewPlayer();
  }

  componentDidUpdate(oldProps) {
    // Only stop and re-render the video player if the video itself gets updated
    // This check prevents the video from getting re-rendered even when an
    // unrelated state change happens in a parent component (namely, the
    // messagesPointer state property)
    if (oldProps.video.id !== this.props.video.id ||
      oldProps.video.start !== this.props.video.start) {
      this.removePlayer();
      this.addNewPlayer();
    }
  }

  removePlayer() {
    this.refs.video.innerHTML = '';
  }

  addNewPlayer() {
    ReactDOM.render(<TwitchEmbed
      id={this.props.video.id}
      startTime={this.props.video.start}
      startString={utils.getStartString(this.props.video.start)}
      duration={this.props.video.duration}
      preview={this.props.video.preview}
      handleTimeChange={this.props.handleTimeChange}
      fetchChat={this.props.video.fetchChat}
      handleHeightCalculation={this.props.handleHeightCalculation}
    />, this.refs.video);
  }

  render() {
    return (
      <div className='video-outer'>
        <div className='video' ref='video'></div>
      </div>
    );
  }
}

Video.propTypes = {
  video: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    start: React.PropTypes.number.isRequired,
    duration: React.PropTypes.number.isRequired,
    preview: React.PropTypes.string.isRequired,
  }).isRequired,
  handleTimeChange: React.PropTypes.func.isRequired,
  handleHeightCalculation: React.PropTypes.func.isRequired
};

export default Video;
