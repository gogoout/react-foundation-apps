```html
<Trigger open="advancedModal">
  <a className="button">Open Modal</a>
</Trigger>  
<Modal id = 'advancedModal' overlay = {true} animationIn = 'slideInDown' animationOut = 'slideOutUp'
				       onShow = {this.show} onHide = {this.hide}>
	<div className = "grid-block vertical">
		<div className = "shrink grid-content">
			<img
				src = "http://fc07.deviantart.net/fs70/i/2012/014/b/e/snowy_peak_by_cassiopeiaart-d4mb6aq.jpg"/>
		</div>
		<div className = "grid-content button-group">
			<Trigger close = "">
				<a className = "button">Ok</a>
			</Trigger>
			<Trigger close = 'advancedModal'>
				<a className = "button">Cancel</a>
			</Trigger>
		</div>
	</div>
</Modal>
```        