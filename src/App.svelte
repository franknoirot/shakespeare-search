<script context='module' role='build-vars'>
	export let shakespeareData = 'shakespeare.js';
</script>

<script>
	let search = ''
	let searchInstances = []
	const genres = ['comedy', 'history', 'tragedy']

	const playsByGenre = genres.map(g => [g, Object.entries(shakespeareData).filter(([name, play]) => play.genre === g)])

	$: if (search.length > 2) {
		searchInstances = Object.entries(shakespeareData).map(([key, val]) => {
			const regexp = new RegExp("[ \.,!\?\\-–—]"+search+"[ \.\,\!\?\\-–—]", 'gi')

			return [key, Array.from(val.text.matchAll(regexp), m => m.index)]
		})
	} else {
		searchInstances = []
	}

	function findLineId(html, searchStart) {
		const lineStr = '<A NAME='
		const nameStart = html.lastIndexOf(lineStr, searchStart)
		if (nameStart < 0) return false
		const lineId = html.slice(nameStart + lineStr.length, html.indexOf('>', nameStart + lineStr.length + 1))
		return lineId
	}
</script>

<div class='intro'>
	<div>
		<h1>Shakespeare Searcher</h1>
		<p>
			This tool was built to work with the <a href='http://shakespeare.mit.edu' target='_blank' rel='noreferrer noopener'>MIT Shakespeare Library</a>,
			 which has published all of Shakespeare's plays for public use. It uses Svelte.js to search all 37 plays for whatever is typed into the search bar.
		</p>
	</div>
	<div class='input-group'>
		<label for="searchbar">Search</label>
		<input name="searchbar" bind:value={ search } placeholder='ex: songs'>
	</div>
</div>
<main>
	{#each playsByGenre as genre, j (genre)}
	<section class={ genre[0] }>
		<h2 class='title-case'>{ genre[0] }</h2>
		{#each genre[1] as play, k (play[0])}
			<details>
				<summary>{ play[0] }{@html (searchInstances.length > 0) ? (' - <strong>' + searchInstances.find(inst => inst[0] === play[0])[1].length + '</strong>') : '' }</summary>
				{@html (searchInstances.find(inst => inst[0] === play[0]))
					? ('<ul>' + searchInstances.find(inst => inst[0] === play[0])[1].map(index => 
					`<li><a href='http://shakespeare.mit.edu/${ play[1].uri }/full.html#${ findLineId(play[1].text, index) }'>${ findLineId(play[1].text, index) }</a>: ...${ play[1].text
						.slice(index - 40, index + search.length + 40)
						.replace(/(<.*?>)|^(.*?>)|(<\/.*?)$/gi, '')
						.replace(new RegExp(search.replace(/\./g, '\.'), 'i'), `<span class='highlight'>$&</span>`) }...</li>`).join('') + '</ul>') : ''}
			</details>
		{/each}
	</section>
	{/each}
</main>

<style>
	.intro {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		margin: 5vh auto;
		gap: 5vw;
		max-width: 960px;
	}

	main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-content: center;
		margin: 0 5vw;
		gap: 1em;
		max-width: 960px;
		margin: auto;
	}

	.title-case {
		text-transform: capitalize;
	}

	.input-group {
		margin: 2em auto;
		width: max-content;
	}

	.input-group > * {
		width: min-content;
		display: block;
	}

	.comedy {
		--text-color: rgb(128, 108, 0);
		--bg-color: rgb(255, 247, 202);
	}

	.history {
		--text-color: rgb(177, 0, 24);
		--bg-color: rgb(255, 214, 214);
	}

	.tragedy {
		--text-color: rgb(0, 83, 138);
		--bg-color: rgb(227, 237, 255);
	}

	section {
		color: var(--text-color);
		background: var(--bg-color);
		border-radius: .5rem;
		padding: 1em;
	}

	section > * {
		margin-inline-start: auto;
		margin-inline-end: auto;
	}

	@media (max-width: 768px) {
		.intro {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.input-group {
			margin-block-end: .5em;
		}
		main {
			grid-template-columns: 1fr;
			margin: 1em 1vw 10vh;
		}
	}
</style>