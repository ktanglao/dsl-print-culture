Vue.component('issues',{
	data() {
		return { journals: []  };
 	},
	mounted() {
		axios.get('/broadwayjournal/issues').then(response => this.journals = response.data);
	 },
        template: `
        <div class="issues">
		<div>
		<issue v-for="journal in journals" v-text='journal["uri"]'></issue>
		</div>
        </div>
        `
});

Vue.component('issue',{
	data() {
		return {href:'' };
	},
	mounted() {
		this.href = this.$el.baseURI.replace(/\/#issues/g, this.$el.innerHTML);
	},
	template: `
		<a :href="this.href"></a>
        `
});

Vue.component('tabs', {
	template: `
		<div>
			<div class="tabs">
				<ul>
			    		<li v-for="tab in tabs" :class="{'is-active': tab.isActive}">
				    		<a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a>
		    			</li>
				</ul>
			 </div>
			<div class="tabs-details"><slot></slot></div>
		</div>
		`,
	data() {
		return {tabs: [] };
	},
	created(){
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive= (tab.name==selectedTab.name);
			});
		}
	}

});

Vue.component('tab',{
	template: `
	<div v-show="isActive"><slot></slot></div>
	`,
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		href(){
			return '#' + this.name.toLowerCase().replace(/ /g, '-');
		}
	},
	mounted() {
		this.isActive = this.selected;
	},
	props: {
		name: { required: true },
		selected: {default: false}
		}
});

new Vue({
	el:'#app',
	data: {
		journals: [],
	},
	mounted() {
		axios.get('/broadwayjournal/issues').then(response => this.journals = response.data);
	}

})
