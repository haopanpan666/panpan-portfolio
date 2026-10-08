import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource-variable/bodoni-moda'
import '@fontsource-variable/inter'
import '@fontsource-variable/playfair-display'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  ['STORIES', '/#work'],
  ['THINK', '/#think'],
  ['IDEAS', '/cases/small-ideas'],
  ['DELIVERY', '/cases/binrongfu'],
  ['OUTSIDE', '/#outside'],
  ['EXPERIENCE', '/#experience'],
  ['ABOUT', '/#about'],
  ['CONTACT', '/#contact'],
]

const tags = (items) => (
  <div className="tag-list">
    {items.map((item) => <span key={item}>{item}</span>)}
  </div>
)

function SiteHeader({ theme = 'light' }) {
  return (
    <header className={`site-header ${theme === 'dark' ? 'is-dark' : ''}`}>
      <Link className="wordmark" to="/" aria-label="返回首页">
        <span>PANPAN</span>
        <small>CREATIVE PLANNING / EXPERIENCE DESIGN</small>
      </Link>
      <nav aria-label="页面导航">
        {navItems.map(([label, href]) => <Link key={label} to={href}>{label}</Link>)}
      </nav>
    </header>
  )
}

function ArrowLink({ href, children }) {
  if (href.startsWith('/')) return <Link className="arrow-link" to={href}><span>{children}</span><b>↗</b></Link>
  return <a className="arrow-link" href={href}><span>{children}</span><b>↗</b></a>
}

function Screen({ number, label, children, className = '' }) {
  return (
    <article className={`screen ${className}`}>
      <div className="screen-index">
        <span>{number}</span>
        <i />
        <small>{label}</small>
      </div>
      <div className="screen-body">{children}</div>
    </article>
  )
}

function MetaList({ items }) {
  return (
    <dl className="meta-list">
      {items.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
    </dl>
  )
}

function ProjectIntro({ number, name, title, english, summary, tags: projectTags, id }) {
  return (
    <div className="project-intro" id={id}>
      <div className="project-intro-top">
        <span className="project-no">CASE {number}</span>
        {tags(projectTags)}
      </div>
      {name && <p className="project-name">{name}</p>}
      <h2>{title}</h2>
      <p className="project-english">{english}</p>
      <p className="project-summary">{summary}</p>
    </div>
  )
}

function Quote({ children, className = '' }) {
  return <blockquote className={`editorial-quote ${className}`}>{children}</blockquote>
}

function Hero() {
  return (
    <section className="hero texture-section" id="top">
      <SiteHeader />
      <div className="hero-stage">
        <div className="hero-watermark">Creative<br />Planning</div>
        <div className="hero-main">
          <p className="hero-subtitle">创意策划×体验设计</p>
          <h1>PANPAN</h1>
          <p className="hero-english-title" lang="en">Creative Planning × Experience Design</p>
          <div className="hero-copy">
            <p>过去几年，我参与过私宅、酒店、文旅与公共空间项目，从概念、方案、客户沟通一路跟进到施工。现在，我希望把这些积累带到文旅活动策划与运营中，去创造更多真正会被人参与、感受和记住的体验。</p>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>01 / 10</span></div>
      </div>
    </section>
  )
}

function QuickInfo() {
  return (
    <section className="info-page texture-section" id="quick-info">
      <div className="section-marker"><span>01</span><i />QUICK INFO｜基本信息</div>
      <div className="info-grid">
        <figure className="profile-figure">
          <img src="/assets/profile.jpg" alt="个人形象照" />
        </figure>
        <div className="info-content">
          <div className="info-headline"><span>ABOUT ME</span><strong>27</strong></div>
          <h2>QUICK<br /><em>INFO</em></h2>
          <div className="info-columns">
            <MetaList items={[
              ['AGE', '27'],
              ['BASE', '杭州 Hangzhou'],
              ['EDUCATION', <>浙江大学 · 艺术学学士<br />Zhejiang University · Bachelor of Arts</>],
            ]} />
            <MetaList items={[
              ['BACKGROUND', '景观 / 空间设计 · 全流程项目经验'],
              ['CURRENT INTEREST', '体验策划 / 文旅 / 空间叙事 / 项目落地'],
            ]} />
          </div>
          <div className="info-links">
            <ArrowLink href="#work">Selected Works｜精选项目</ArrowLink>
            <ArrowLink href="#outside">Outside of Work｜工作之外</ArrowLink>
            <ArrowLink href="#contact">Contact｜联系</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}

const selectedStories = [
  { number: '01', to: '/cases/yangming-hot-spring', name: '余姚阳明温泉山庄', title: '一个让人慢下来的地方', english: 'A Place to Slow Down', tags: 'Destination Planning · Experience Planning · Concept Development', cover: '/assets/projects/01-yangming.jpg' },
  { number: '02', to: '/cases/yuelongwan', name: '余姚悦龙湾', title: '两栋房子之间', english: 'Designing the In-Between', tags: 'Spatial System · Residential Landscape · Integration', cover: '/assets/projects/02-yuelongwan.jpg' },
  { number: '03', to: '/cases/qidu-huaqiao-garden', name: '温州七都华侨花园', title: '生活的艺术家', english: 'The Art of Living', tags: 'Art & Lifestyle · Level Design · Landscape Experience', cover: '/assets/projects/03-qidu.jpg' },
  { number: '04', to: '/cases/binrongfu', name: '杭州滨融府', title: '两个露台，两种生活', english: 'Two Terraces, Two Ways of Living', tags: 'Built & Delivery · Roof Terrace · Full-process Design', cover: '/assets/projects/04-binrongfu.jpg' },
  { number: '05', to: '/cases/daye-fragrance-exhibition', name: '湖北大冶芳香产业文化展馆', title: '让无形的香气被感知', english: 'Making the Invisible Perceptible', tags: 'Cultural Tourism · Exhibition · Sensory Experience', cover: '/assets/projects/05-daye.jpg' },
  { number: '06', to: '/cases/small-ideas', name: '设计亮点', title: '方案中的小想法', english: 'Small Ideas', tags: 'Design Notes · Everyday Observation · 03 Stories', cover: '/assets/projects/06-small-ideas.jpg' },
]

function SelectedStoryCard({ story, clone = false }) {
  return (
    <Link className="selected-story" to={story.to} tabIndex={clone ? -1 : undefined} draggable="false">
      <div className="selected-story-media" aria-hidden="true">
        <img src={story.cover} alt="" draggable="false" loading="lazy" onError={(event) => event.currentTarget.remove()} />
        <span>{story.number}</span><small>{story.english}</small>
      </div>
      <div className="selected-story-copy"><div className="selected-story-kicker"><span>{story.number}</span><strong>{story.name}</strong></div><b>{story.title}</b><small>{story.english}</small><i>{story.tags}</i></div>
    </Link>
  )
}

function SelectedWorks() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const moveRef = useRef(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const sets = track ? [...track.querySelectorAll('.selected-story-set')] : []
    if (!viewport || sets.length < 3) return undefined

    const cards = [...track.querySelectorAll('.selected-story')]
    let setWidth = 1
    let cardStep = 300
    let viewportCenter = 0
    let snapBase = 0
    let loopCenter = 0
    let cardMetrics = []
    let x = 0
    let target = 0
    const playhead = { value: 0 }
    let scrub
    let pointerActive = false
    let dragging = false
    let startClientX = 0
    let startTarget = 0
    let lastClientX = 0
    let lastTime = 0
    let velocity = 0
    let suppressClickUntil = 0
    let activeCard = null
    let snapTimer

    const measure = (initial = false) => {
      gsap.set(cards, { clearProps: 'transform,opacity,zIndex' })
      gsap.set(track, { x: 0 })
      setWidth = sets[1].getBoundingClientRect().width
      viewportCenter = viewport.clientWidth / 2
      const trackRect = track.getBoundingClientRect()
      cardMetrics = cards.map((card) => {
        const rect = card.getBoundingClientRect()
        return { card, center: rect.left - trackRect.left + rect.width / 2 }
      })
      const middleCards = [...sets[1].querySelectorAll('.selected-story')]
      const firstMetric = cardMetrics.find(({ card }) => card === middleCards[0])
      const secondMetric = cardMetrics.find(({ card }) => card === middleCards[1])
      cardStep = secondMetric && firstMetric ? secondMetric.center - firstMetric.center : 300
      snapBase = viewportCenter - (firstMetric?.center || setWidth)
      loopCenter = snapBase - cardStep * 2
      if (initial) {
        x = loopCenter
        target = loopCenter
      } else {
        x = loopCenter
        target = loopCenter
      }
      playhead.value = loopCenter
    }

    const updateCardFocus = () => {
      let closestCard = null
      let closestDistance = Number.POSITIVE_INFINITY
      cardMetrics.forEach(({ card, center }) => {
        const distance = (center + x - viewportCenter) / cardStep
        const absoluteDistance = Math.abs(distance)
        const scale = Math.max(.42, 1.12 - absoluteDistance * .24)
        const opacity = Math.max(.06, 1 - absoluteDistance * .28)
        const nearPull = Math.max(0, 1.5 - absoluteDistance) * 30
        const farPush = Math.max(0, absoluteDistance - 1.5) * 28
        const shift = Math.sign(distance) * (farPush - nearPull)
        gsap.set(card, {
          x: shift,
          scale,
          opacity,
          zIndex: Math.max(1, Math.round(20 - absoluteDistance * 4)),
          transformOrigin: '50% 42%',
          force3D: true,
        })
        if (absoluteDistance < closestDistance) {
          closestDistance = absoluteDistance
          closestCard = card
        }
      })
      if (closestCard !== activeCard) {
        activeCard?.classList.remove('is-carousel-active')
        closestCard?.classList.add('is-carousel-active')
        activeCard = closestCard
      }
    }

    const wrapX = (value) => {
      if (!setWidth) return value
      return gsap.utils.wrap(loopCenter - setWidth / 2, loopCenter + setWidth / 2, value)
    }

    const render = (value) => {
      x = wrapX(value)
      gsap.set(track, { x, force3D: true })
      updateCardFocus()
    }

    const requestScrub = (duration = .5) => {
      if (!scrub) return
      scrub.vars.duration = duration
      scrub.vars.value = target
      scrub.invalidate().restart()
    }

    const snap = () => {
      target = snapBase - Math.round((snapBase - target) / cardStep) * cardStep
    }

    const moveBy = (direction) => {
      target -= direction * cardStep
      snap()
      requestScrub(.5)
    }
    moveRef.current = moveBy

    const handlePointerDown = (event) => {
      if (event.button !== 0) return
      pointerActive = true
      dragging = false
      startClientX = event.clientX
      startTarget = target
      lastClientX = event.clientX
      lastTime = performance.now()
      velocity = 0
    }

    const handlePointerMove = (event) => {
      if (!pointerActive) return
      const now = performance.now()
      const delta = event.clientX - startClientX
      if (!dragging && Math.abs(delta) < 7) return
      if (!dragging) {
        dragging = true
        viewport.classList.add('is-dragging')
        viewport.setPointerCapture(event.pointerId)
        scrub?.pause()
      }
      event.preventDefault()
      target = startTarget + delta
      playhead.value = target
      render(playhead.value)
      velocity = (event.clientX - lastClientX) / Math.max(16, now - lastTime)
      lastClientX = event.clientX
      lastTime = now
    }

    const handlePointerEnd = (event) => {
      if (!pointerActive) return
      pointerActive = false
      if (dragging) {
        target += velocity * 140
        snap()
        suppressClickUntil = performance.now() + 320
        requestScrub(.56)
      }
      viewport.classList.remove('is-dragging')
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId)
      dragging = false
    }

    const handleClick = (event) => {
      if (performance.now() < suppressClickUntil) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    const handleWheel = (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < 1) return
      event.preventDefault()
      target -= delta * 1.2
      window.clearTimeout(snapTimer)
      requestScrub(.48)
      snapTimer = window.setTimeout(() => {
        snap()
        requestScrub(.54)
      }, 38)
    }

    const handleResize = () => {
      scrub?.pause()
      measure()
      render(playhead.value)
    }

    const preventNativeDrag = (event) => event.preventDefault()
    scrub = gsap.to(playhead, {
      value: target,
      duration: .5,
      ease: 'power3.out',
      paused: true,
      overwrite: true,
      onUpdate: () => render(playhead.value),
    })
    measure(true)
    render(playhead.value)
    viewport.addEventListener('pointerdown', handlePointerDown)
    viewport.addEventListener('pointermove', handlePointerMove)
    viewport.addEventListener('pointerup', handlePointerEnd)
    viewport.addEventListener('pointercancel', handlePointerEnd)
    viewport.addEventListener('wheel', handleWheel, { passive: false })
    viewport.addEventListener('click', handleClick, true)
    viewport.addEventListener('dragstart', preventNativeDrag)
    window.addEventListener('resize', handleResize)

    return () => {
      window.clearTimeout(snapTimer)
      scrub?.kill()
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('pointermove', handlePointerMove)
      viewport.removeEventListener('pointerup', handlePointerEnd)
      viewport.removeEventListener('pointercancel', handlePointerEnd)
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('click', handleClick, true)
      viewport.removeEventListener('dragstart', preventNativeDrag)
      window.removeEventListener('resize', handleResize)
      moveRef.current = null
    }
  }, [])

  return (
    <section className="selected-works" id="work">
      <div className="selected-top"><span>02</span><span>SELECTED STORIES｜精选案例</span><span>06 STORIES</span></div>
      <div className="selected-content selected-content-wide">
        <p className="selected-english" lang="en">Selected Stories</p>
        <h2>精选<em>案例</em></h2>
        <div className="selected-story-carousel">
          <div className="selected-carousel-controls" aria-label="精选案例切换">
            <button type="button" onClick={() => moveRef.current?.(-1)} aria-label="上一个案例">←</button>
            <button type="button" onClick={() => moveRef.current?.(1)} aria-label="下一个案例">→</button>
          </div>
          <div className="selected-story-viewport" ref={viewportRef} aria-label="可拖动的精选案例列表">
            <div className="selected-story-track" ref={trackRef}>
              {[0, 1, 2].map((setIndex) => (
                <div className="selected-story-set" aria-hidden={setIndex !== 1 ? 'true' : undefined} key={setIndex}>
                  {selectedStories.map((story) => <SelectedStoryCard story={story} clone={setIndex !== 1} key={`${setIndex}-${story.number}`} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function YangmingCase() {
  return (
    <section className="case-section texture-section" id="yangming">
      <ProjectIntro number="01" name="余姚阳明温泉山庄" title="一个让人慢下来的地方" english="A Place to Slow Down" summary="通过疗愈体验与既有资源的重新激活，想象一座运营十五年的温泉度假酒店，还可以如何重新变得值得到访。" tags={['文旅策划 Destination Planning', '体验策划 Experience Planning', '概念设计 Concept Development']} />
      <Screen number="01" label="PROJECT OVERVIEW｜项目概览" className="overview-screen">
        <div className="screen-columns two-col">
          <div><p className="display-note">松弛之境</p><p className="small-english">A PLACE TO SLOW DOWN</p></div>
          <div><MetaList items={[
            ['项目类型｜TYPE', '温泉度假酒店更新策划'],
            ['项目时间｜YEAR', '2025'],
            ['项目状态｜STATUS', <>概念方案 · 后续未继续深化<br /><i>Concept Proposal</i></>],
          ]} /><div className="role-block"><span>我的角色｜MY ROLE</span>{tags(['概念策划', '体验创意', '方案叙事', '协同策划', '客户提案'])}</div></div>
        </div>
        <Quote>面对一座运营十五年的温泉度假酒店，从既有自然与文化资源出发，提出「松弛之境」概念，并参与建立温泉、食养、疗愈森林、自驾停留等体验体系。</Quote>
      </Screen>
      <Screen number="02" label="PROJECT BACKGROUND｜项目背景">
        <div className="copy-layout"><div><p className="screen-title">一座逐渐老去的温泉酒店，怎样重新变得值得到访？</p></div><div className="body-copy"><p>阳明温泉山庄已经营业十五年。</p><p>建筑与基础设施仍维护得较为完整，但部分核心空间与体验已经逐渐难以匹配新的度假需求。</p><p>温泉设施逐渐落后，原有水乐园与独栋私汤长期闲置，明逸轩也失去了用途；从室内更衣区通往户外温泉的距离过长，在冬季尤其影响体验。</p><p>甲方最初的诉求很明确：</p><p className="bold-line">更新温泉与水乐园，重新利用闲置设施，并以此带动周边景观与整体度假体验的升级。</p></div></div>
      </Screen>
      <Screen number="03" label="CORE INSIGHT｜核心洞察">
        <div className="insight-layout"><p className="screen-title">重新看见<br />这里已经拥有的东西</p><div className="body-copy"><p>当视线从温泉区域向外打开，我们重新看见了场地中原本就存在的资源：</p><p className="bold-line">茶山、溪流、山林、温泉、茶园，以及周边文化资源。</p><p>它们并不需要被重新制造，而是需要被重新组织。</p><p>因此，我们以温泉、水乐园与明逸轩为核心，通过更开放的视线与动线，把体验向周边自然与文化环境延伸。</p><p>项目问题也从：</p><p className="question-line">“温泉和水乐园应该怎样改？”</p><p>逐渐转向：</p><p className="question-line">“这些已经存在的资源，能否共同组成一种新的度假理由？”</p></div></div>
      </Screen>
      <Screen number="04" label="CORE CONCEPT｜核心概念" className="concept-screen">
        <div className="concept-layout"><div /><div><p className="concept-lead">不是用更多内容填满一段旅程，而是创造一种让人逐渐慢下来、重新感受身体与自然的状态。</p><div className="four-points"><div><b>RETURN｜回归</b><span>回到自然，也回到身体本身。</span></div><div><b>RESTORE｜恢复</b><span>暂时退出日常，重新获得能量。</span></div><div><b>CONNECT｜连接</b><span>与家人、同行者和自然重新发生关系。</span></div><div><b>SENSE｜感知</b><span>重新听见风、闻到香、看见星空和日落。</span></div></div></div></div>
      </Screen>
      <Screen number="05" label="EXPERIENCE SYSTEM｜体验体系">
        <div className="system-layout"><p className="screen-title">从概念，变成一种完整的度假方式</p><div className="system-grid"><div><b>WATER｜水</b><span>温泉 · 私汤 · 漂浮 · 亲水</span></div><div><b>NATURE｜自然</b><span>疗愈森林 · 芳香花圃 · 茶山</span></div><div><b>NOURISH｜滋养</b><span>采摘 · 食养 · 茶咖</span></div><div><b>STAY &amp; CONNECT｜停留与连接</b><span>露营 · 观星 · 家庭 · 自然社交</span></div></div></div>
      </Screen>
      <Screen number="06" label="THREE KEY IDEAS｜三个关键创意" className="ideas-screen">
        <div className="ideas-list"><div><span>01</span><div><h3>水乐园的淡季功能转换</h3><p>夏季是嬉水空间，淡季则转换为更安静的<strong>漂浮冥想、桨板等水上体验场所</strong>。</p></div></div><div><span>02</span><div><h3>一种新的入住方式</h3><p>由此形成<strong>车尾露营场景服务</strong>的设想，为其提供充电、盥洗、安全等基础配套，并进一步加入观星、自然社交体验场景，将这种自驾停留方式作为多元度假体验的一部分。</p></div></div><div><span>03</span><div><h3>明逸轩的功能再利用</h3><p>一层被设想为向外打开的食养就餐空间；二层拥有更高、更安静的视野，可以远眺茶山。</p></div></div></div>
      </Screen>
      <Screen number="07" label="CLIENT RESPONSE｜项目之后" className="closing-screen">
        <div className="closing-layout"><div><p className="screen-title">CLIENT RESPONSE｜甲方反馈</p><p>方案汇报中，甲方对<strong>重新梳理的动线、“疗愈”概念、食养体验，以及打开酒店边界、与周边自然及文化资源重新建立联系的思路</strong>给予了积极反馈。</p></div><div><p className="screen-title">WHAT I LEARNED｜项目之后</p><Quote><strong>一个好的概念，并不是为项目贴上一个漂亮的名字。</strong><br /><br />它应该帮助我们重新看待已经存在的问题，并继续生长出空间、活动和真实体验。<br /><br />这个项目让我越来越明确：<br /><br /><strong>我真正感兴趣的，不只是设计一个空间，也包括思考人在这里可以发生什么。</strong></Quote></div></div>
      </Screen>
    </section>
  )
}

function BinrongCase() {
  return (
    <section className="case-section texture-section" id="binrongfu">
      <ProjectIntro number="04" name="杭州滨融府" title="两个露台，两种生活" english="Two Terraces, Two Ways of Living" summary="在两个与室内生活紧密相连的屋顶露台中，分别回应独处与相聚的日常场景，并在施工阶段面对荷载、设备、材料与植物条件持续调整，最终完成落地。" tags={['Built & Delivery', 'Roof Terrace', 'Full-process Design']} />
      <Screen number="01" label="PROJECT OVERVIEW｜项目概览" className="overview-screen"><div className="screen-columns two-col"><div><p className="display-note">两个露台<br />两种生活</p></div><div><MetaList items={[
        ['项目名称｜PROJECT', '杭州滨融府'], ['项目类型｜TYPE', '高端住宅屋顶露台 / 私宅花园'], ['项目时间｜YEAR', '2024'], ['项目面积｜AREA', '约140㎡'], ['项目状态｜STATUS', <>已交付<br /><i>Completed</i></>],
      ]} /><div className="role-block"><span>我的角色｜ROLE</span><p>主创设计 / 方案深化 / 视觉表达 / 植物设计 / 施工跟进 / 客户沟通</p></div></div></div></Screen>
      <Screen number="02" label="TWO TERRACES｜两个露台，两种生活场景"><div className="terrace-grid"><div><p className="accent-label">EAST｜东侧</p><h3>两个露台，对应两种生活场景。</h3><p>东侧露台连接客厅，空间狭长、呈 L 形，更安静，也更接近一个人的日常。</p><p>西侧露台连接茶室，面积更大，承担喝茶、聊天与聚会，更开放，也更适合共同停留。</p></div><div><p className="accent-label">WEST｜西侧</p><h3>从不同的室内空间出发，建立不同的花园关系。</h3><p>两个露台没有被处理成同一种花园，而是分别回应窗景、停留、私密与相聚。</p><Quote>两个露台从不同的室内空间出发，也对应两种不同的生活状态。</Quote></div></div></Screen>
      <Screen number="03" label="EAST TERRACE｜东侧露台"><div className="copy-layout"><div><p className="accent-label">EAST TERRACE</p><p className="screen-title">东露台——独处</p></div><div className="body-copy"><p>东侧露台对应客厅。由于空间狭长，地面能够展开的内容有限，因此设计重点被放到立面与纵向空间。</p><p>一组层叠的雕塑感水景与景墙成为主要视觉中心，盆景、折叠小吧台与植物共同组织在其周围。植物以球形灌木与较自然的杂木感搭配，在有限空间里增加层次。</p><Quote>从客厅里，它是一幅窗景；走出去以后，也可以成为一个人坐下来喝一杯的地方。</Quote></div></div></Screen>
      <Screen number="04" label="WEST TERRACE｜西侧露台"><div className="copy-layout"><div><p className="accent-label">WEST TERRACE</p><p className="screen-title">西露台——聚会</p></div><div className="body-copy"><p>西侧露台连接茶室，面积更大，承担家人喝茶、朋友聊天与几个人一起停留的场景。</p><p>设计通过竹篱 / 屏风建立边界与私密感，并布置遮阳伞、沙发卡座等更适合多人使用的家具。露台既是可以真正走出去使用的空间，也需要在茶室内部形成稳定的框景。</p><Quote>与东侧的安静相比，这里承担的是更开放、更松弛的相聚场景。</Quote></div></div></Screen>
      <Screen number="05" label="LOAD LIMIT｜现实限制"><div className="load-layout"><div><p className="accent-label">PROBLEM / ADJUSTMENT</p><p className="screen-title">屋顶花园<span className="nowrap-title-unit">首先</span>要解决重量</p></div><div className="body-copy"><p><strong>问题</strong><br />屋顶荷载有限，但设计需要景石、覆土与植物层次。</p><p><strong>调整</strong></p><ul className="editorial-list"><li><strong>景观石掏空</strong>：仅保留外部壳体，降低整体重量。</li><li><strong>减少覆土</strong>：减少不必要的大面积覆土。</li><li><strong>调整种植</strong>：根据实际覆土条件重新选择植物。</li></ul><p>这些变化没有改变空间关系，而是让方案在真实结构条件下继续成立。</p></div></div></Screen>
      <Screen number="06" label="SITE ADJUSTMENT｜现场调整"><div className="copy-layout exhaust-layout"><div><p className="accent-label">SITE ADJUSTMENT</p><p className="screen-title">一个不能移动的排风口</p></div><div className="body-copy"><p>建筑原有排风口无法移动，但又处于主要视觉界面中。</p><p>最终通过景墙、水景与植物之间的组合，把设备纳入整体构图，同时保留正常排风功能。</p><Quote>现场条件变化后，设计仍需要继续成立。</Quote></div></div></Screen>
      <Screen number="07" label="FROM DRAWING TO REALITY｜从方案到落地" className="closing-screen"><div className="render-layout"><div><p className="screen-title">方案<br />→ 深化<br />→ 现场<br />→ 调整<br />→ 落地</p></div><div className="body-copy"><p>效果图中的空间关系，在施工过程中经历了荷载、设备、材料与植物条件的不断校正。</p><p>最终完成后的花园与最初概念仍保持一致，但它已经经过现实条件的重新筛选。</p></div></div></Screen>
      <Screen number="08" label="TAKEAWAY｜项目之后" className="closing-screen"><div className="closing-layout"><div><p className="accent-label">TAKEAWAY</p><p className="screen-title">执行力是让一个<span className="nowrap-title-unit">想法</span>经历真实条件<span className="nowrap-title-unit">之后，</span>仍然能够成立。</p></div><div className="body-copy"><p>设计进入现场以后，需要在结构、设备、材料、施工与使用之间不断调整，让最初的空间关系和体验尽可能完整地保留下来。</p></div></div></Screen>
    </section>
  )
}

function YuelongCase() {
  return (
    <section className="case-section texture-section" id="yuelongwan">
      <ProjectIntro number="02" name="余姚悦龙湾" title="两栋房子之间" english="Designing the In-Between" summary="在接待与起居、车行与花园、现代与日式之间，为两栋用途不同的别墅建立一个完整而自然的空间系统。" tags={['私宅景观 Residential Landscape', '空间系统 Spatial System', '体验组织 Experience Planning']} />
      <Screen number="01" label="PROJECT INFO｜项目信息" className="overview-screen">
        <div className="screen-columns two-col"><div><p className="display-note">两栋房子之间</p><p className="small-english">DESIGNING THE IN-BETWEEN</p></div><div><MetaList items={[
          ['项目类型｜TYPE', '双别墅合并花园'], ['项目时间｜YEAR', '2025'], ['项目面积｜AREA', '约 1600㎡'], ['项目状态｜STATUS', <>施工进行中<br /><i>Under Construction</i></>],
        ]} /><div className="role-detail-grid"><span>我的角色｜MY ROLE</span><p>主创设计｜负责整体方案构思与空间组织<br />方案深化｜推进方案深化、节点与材料关系<br />视觉表达｜负责效果图与设计表达<br />植物设计｜参与整体植物空间与氛围组织<br />施工跟进｜参与施工阶段调整与落地跟进<br />客户沟通｜直接与业主沟通需求、方案与修改意见</p></div></div></div>
      </Screen>
      <Screen number="02" label="CONTEXT｜项目背景"><div className="copy-layout"><p className="screen-title">两栋相邻的房子，<br /><span className="context-question-line">需要一个怎样的花园？</span></p><div className="body-copy"><p>业主是一对从事制造行业的中年企业家夫妻。</p><p>由于日常生活之外还有一定的商务与社交接待需求，他们先后购入了两栋相邻别墅，并希望将原本彼此独立的庭院合并成一个整体花园。</p><p>其中一栋更偏向<strong>接待、聚会与会所式使用</strong>，另一栋则主要服务于<strong>家庭日常起居</strong>。</p><p>与此同时，两栋别墅的建筑气质偏现代海派 / 现代法式，业主本人却更偏爱安静、自然的日式庭院。</p><p>场地还必须满足车辆进入、到达、停车，以及两栋建筑之间的连续通行。</p><p>两个花园的联通只是最基础的一步。真正需要解决的是：</p><Quote>如何让行车入户与花园生活彼此连接却互不干扰，同时让不同的空间功能与风格自然地过渡？</Quote></div></div></Screen>
      <Screen number="03" label="SPATIAL SYSTEM｜三个花园，一套系统"><div className="garden-layout"><p className="screen-title">三个花园，一套系统</p><div className="garden-list"><div><b>01 入户花园｜Arrival Garden</b><span>包括两栋建筑各自的入户区域，以及连接两处入口的连续车行空间。<br />到达 · 行车 · 停车 · 建筑展示</span></div><div><b>02 主花园｜Main Garden</b><span>位于两栋建筑之间，以一块开阔草坪为中心，回到停留、活动、观景与日常生活。</span></div><div><b>03 休闲花园｜Leisure Garden</b><span>位于起居建筑南侧，对应挑空客厅的大面积落地玻璃，以镜面水景、沿河小路、休闲躺椅与植物围合形成更安静的停留空间。</span></div></div></div></Screen>
      <Screen number="04" label="ARRIVAL & PARKING｜让车进入花园，但不让车主导花园"><div className="copy-layout arrival-layout"><p className="screen-title">让车进入花园，<br />但不让车主导花园</p><div className="body-copy"><p>两栋建筑之间的连接空间尺度有限，却同时需要承担：</p><p className="bold-line">进入、到达、停车、转向，以及继续前往另一栋建筑。</p><p>因此，设计将停车功能直接整合进入户花园，让两栋建筑前的空间同时承担<strong>到达与临时停车</strong>。</p><p>车辆停留时：</p><p className="question-line">这里可以完成停车与上下客。</p><p>车辆离开后：</p><p className="question-line">它重新成为完整的建筑入户空间。</p><p className="bilingual-line">Arrival Garden ↔ Parking<br />入户空间 ↔ 停车空间</p><Quote>面对不同需求，不一定需要不断增加空间；合理的复合使用同样可以给出答案。</Quote></div></div></Screen>
      <Screen number="05" label="THREE IN-BETWEENS｜三个“之间”"><div className="three-in-betweens"><p className="screen-title">几个不同状态之间<br />如何发生转换</p><div className="three-in-between-grid"><div><b>01 到达与停车之间</b><p>停车只在车辆出现时成为这里的主要功能；其余时间，空间仍然保持完整的入户秩序。</p></div><div><b>02 室内与室外之间</b><p>挑空客厅、落地玻璃、镜面水景、休闲花园与河岸形成连续的视线和行走关系。</p></div><div><b>03 现代与日式之间</b><p>让人从理性、正式的入户花园，自然进入更加自然、松弛的生活花园。</p></div></div></div></Screen>
      <Screen number="06" label="INSIDE & OUTSIDE｜室内与室外之间"><div className="copy-layout inside-layout"><p className="screen-title">室内与室外之间</p><div className="body-copy"><p>项目中有两处重要的室内外接口。</p><p>第一处是起居建筑南侧。大面积落地玻璃直接面向休闲花园，镜面水景贴近建筑展开，植物与河岸景观继续向外延伸，让人在客厅中就能感知花园；走出室内后，空间又自然过渡到休闲停留与沿河步行。</p><p>第二处位于地下层的采光井。它连接酒廊、酒窖 / 雪茄、影音及休闲空间。</p><p>在满足采光和通风的基础上，这里加入高吧家具、大型花器与棕榈等植物，把地下生活向户外延伸。</p><p className="bilingual-line">Lightwell｜采光井<br />↓<br />Semi-outdoor Lounge｜半户外休闲空间</p></div></div></Screen>
      <Screen number="07" label="MODERN & JAPANESE｜现代与日式之间"><div className="copy-layout modern-layout"><p className="screen-title">现代与日式之间</p><div className="body-copy"><p>业主偏爱日式庭院，但两栋建筑本身具有较明显的现代海派 / 现代法式气质。</p><p>与其在两种风格之间做选择，我们更关注它们之间的<strong>过渡</strong>：</p><Quote>人怎样从一种空间状态，自然地进入另一种状态？</Quote><p>入户花园首先回应建筑。铺装、植物与空间秩序更加理性、正式，保持建筑本身的到达感。</p><p>随着人离开车行与入户系统，进入主花园和休闲花园，空间逐渐变得更加自然、松弛。</p><p className="bilingual-line">FORMAL → NATURAL<br />正式 → 自然</p></div></div></Screen>
      <Screen number="08" label="A DIFFERENT POINT OF VIEW｜改变观看花园的位置"><div className="viewpoint-layout"><div><p className="screen-title">改变观看花园的位置</p></div><div className="body-copy"><p>在主花园最远的一角，我们设置了一座相对独立的休闲亭。它可以承担喝茶、棋牌与日常停留，也改变了人观看整个花园的位置。</p><p>大多数时候，人从住宅内部向外看花园：</p><p className="bilingual-line">House → Garden<br />建筑 → 花园</p><p>当人穿过草坪，走到场地最远端的亭子之后，观看方向第一次发生反转。</p><p className="bilingual-line">House → Garden → Pavilion → Look Back<br />建筑 → 花园 → 亭子 → 回望</p><p>这段路径让花园从住宅窗外的景观，变成一段可以真正进入、穿过，并在另一端回望的空间体验。</p></div></div></Screen>
      <Screen number="09" label="TAKEAWAY｜项目之后" className="closing-screen"><div className="closing-layout"><div><p className="screen-title">回到人与<span className="nowrap-title-unit">空间</span>的关系</p><p>这个项目最终需要处理的，是几组必须<strong>同时成立的关系</strong>：</p><p className="relation-stack">接待与起居——车行与花园——正式与松弛——室内与室外——现代与日式</p></div><div><Quote><strong>设计的价值，也可以来自对人与空间关系的重新安排。</strong></Quote><p className="italic-line">Designing relationships, not just spaces.</p><p className="bilingual-line">设计关系，而不只是空间。</p></div></div></Screen>
    </section>
  )
}

function QiduCase() {
  return (
    <section className="case-section texture-section" id="qidu">
      <ProjectIntro number="03" name="温州七都华侨花园" title="生活的艺术家" english="The Art of Living" summary="通过艺术化空间、强烈高差、下沉泳池、悬空步道和热带植物，组织一套更自由的年轻家庭生活场景。" tags={['Art & Lifestyle', 'Level Design', 'Landscape Experience']} />
      <Screen number="01" label="PROJECT INFO｜项目概览" className="overview-screen">
        <div className="screen-columns two-col"><div aria-hidden="true" /><div><MetaList items={[
          ['项目类型｜TYPE', '私宅庭院 / 滨水住宅景观'], ['项目时间｜YEAR', '2026'], ['项目面积｜AREA', '约1200㎡'], ['项目状态｜STATUS', <>准备施工<br /><i>Preparing for Construction</i></>],
        ]} /><div className="role-detail-grid"><span>我的角色｜MY ROLE</span><p>主创设计 Lead Design<br />方案深化 Design Development<br />视觉表达 Visualization<br />植物设计 Planting Design<br />动画表现 Animation Visualization<br />客户沟通 Client Communication</p></div></div></div>
        <div className="north-south-diagram"><span>NORTH / 北侧<br />ARRIVAL GARDEN</span><i>→</i><span>SOUTH / 南侧<br />LIVING GARDEN</span></div>
      </Screen>
      <Screen number="02" label="CONTEXT｜项目背景"><div className="copy-layout"><p className="screen-title">一个年轻家庭的<br />滨水花园</p><div className="body-copy"><p>项目位于温州七都，业主是一对年轻夫妻，孩子正在读高中。</p><p>场地由南北两部分花园组成。北侧连接建筑主要入口，需要同时解决<strong>到达、停车、隐私与建筑形象</strong>；南侧面积更大，并直接面向河道，是一家人真正长时间停留、游泳、吃饭、喝茶与休息的生活花园。</p><p>两部分空间承担着不同的任务，但又需要通过连续动线形成一个完整的家。</p><p>前期沟通中，业主并没有提出非常具体的风格或功能要求，整体需求相对模糊。因此，我们结合家庭结构、场地条件和滨水环境，主动提出了一个方向：</p><p className="bold-line">有生活情调，也有艺术感。</p></div></div></Screen>
      <Screen number="03" label="CONCEPT｜核心概念"><div className="concept-layout"><div><p className="concept-word">“生活的艺术家”</p><p className="small-english">THE ART OF LIVING</p></div><div className="body-copy"><p>“生活的艺术家”是结合家庭结构、场地条件与生活场景，为项目建立的主题方向。</p><p>艺术感来自材料、尺度、构图和植物；生活感则来自人在这些空间里真正会发生的事情。</p><div className="life-moments"><span>Arrival</span><span>Reading on the Lawn</span><span>Swimming</span><span>Drinking by the Water</span><span>Tea by the Riverside</span></div></div></div></Screen>
      <Screen number="04" label="NORTH / ARRIVAL GARDEN｜北侧入户花园"><div className="copy-layout"><div><p className="accent-label">ARRIVAL GARDEN</p><p className="screen-title">隐私也是<br />景观的一部分</p></div><div className="body-copy"><p>北侧入户花园直接面向社区道路。设计通过一组具有雕塑感的几何景墙建立第一层边界。墙体采用错落关系，而不是连续封闭的实墙；植物从墙与墙之间的缝隙中生长出来，让界面保持遮挡，也保留一定的呼吸感。</p><p>在材料上，小块叠石与体量更大的几何岩石并置，两种尺度形成明显对比，让入户空间在相对克制的基础上拥有更强的视觉识别。</p><p className="accent-label">RAISED PLANTING｜抬高种植</p><p className="bold-line">北侧植物区域整体抬高约40cm，使植物更接近视线，也进一步削弱道路对住宅内部的直接视线。</p></div></div></Screen>
      <Screen number="05" label="SOUTH / SUNKEN GARDEN｜南侧高差"><div className="copy-layout"><div><p className="accent-label">SUNKEN GARDEN</p><p className="screen-title">通过高差<br />改变花园的使用方式</p></div><div className="body-copy"><p><strong>隐私</strong><br />泳池设置在下沉庭院，阻隔园外视线。</p><p><strong>空间层次</strong><br />栈桥悬于泳池上方，提供了空中俯瞰下沉庭院的新体验。</p><p><strong>连接</strong><br />楼梯与跨越泳池的悬空步道连接不同标高。步道承担交通功能，也提供一个短暂的高处视角。</p></div></div></Screen>
      <Screen number="06" label="POOL & ROCK WALL｜一条贴着岩壁的泳池"><div className="copy-layout pool-layout"><div><p className="accent-label">POOL &amp; ROCK WALL</p><p className="screen-title">一条贴着岩壁的泳池</p></div><div className="body-copy"><p>长条泳池沿景墙展开，岩壁顶部的水经过循环系统重新回到泳池，水声、岩石、灯光与植物共同构成下沉空间的背景。</p><Quote>夏日傍晚，游完泳从水里上岸，坐到岩壁旁的软垫上开一瓶香槟。跌水声留在身后，水面和树影把晃动的光投在周围，风从河边吹过来，白天的暑气也慢慢散下去。</Quote></div></div></Screen>
      <Screen number="07" label="LIVING LANDSCAPE｜回到地面"><div className="copy-layout"><div><p className="accent-label">LIVING LANDSCAPE</p><p className="screen-title">更自由的日常生活</p></div><div className="body-copy"><p>离开下沉空间后，南侧重新回到开阔的地面层。草坪、砾石与沙生植物、亭子、河岸平台和秋千共同组成更松弛的生活区域。</p><p>从入口到河岸，空间也从较正式的“到达”，逐渐转向更加自由的“生活”。</p></div></div></Screen>
      <Screen number="08" label="TROPICAL ATMOSPHERE｜植物与色彩"><div className="copy-layout planting-layout"><div><p className="accent-label">TROPICAL ATMOSPHERE</p><p className="screen-title">植物与色彩</p></div><div className="body-copy"><p><strong>高层</strong><br />棕榈</p><p><strong>中层</strong><br />大叶植物 / 球形灌木</p><p><strong>低层</strong><br />花境 / 沙生植物</p><p>植物既参与建筑与景墙的构图，也在生长过程中逐渐变得更自然。南侧通过更丰富的层次和色彩，形成鲜明而轻松的度假感。</p></div></div></Screen>
      <Screen number="09" label="TAKEAWAY｜项目之后" className="closing-screen"><div className="closing-layout"><div><p className="screen-title">艺术感和生活感<br />如何同时成立</p></div><div><p>花园可以有明确的构图、材料与视觉表达，也可以具体回应停车、隐私、游泳、吃饭、喝茶、阅读、亲水和家庭相处。</p><Quote><strong>让艺术进入日常，也让日常本身拥有被认真设计的价值。</strong></Quote></div></div></Screen>
    </section>
  )
}

function DayeCase() {
  return (
    <section className="case-section texture-section daye-case" id="daye">
      <ProjectIntro number="05" name="湖北大冶芳香产业文化展馆" title="让无形的香气被感知" english="Making the Invisible Perceptible" summary="尝试用曲线、透明材质、投影、雾与光，把无形的“香”转译成可被身体感知的空间体验。" tags={['Cultural Tourism', 'Exhibition', 'Sensory Experience']} />
      <Screen number="01" label="PROJECT OVERVIEW｜项目概览" className="overview-screen"><div className="screen-columns two-col"><div><p className="display-note">看不见的香气</p><p className="small-english">MAKING THE INVISIBLE PERCEPTIBLE</p></div><div><MetaList items={[
        ['项目名称｜PROJECT', '湖北大冶芳香产业文化展馆'], ['项目类型｜TYPE', '产业文化展馆 / 文旅展陈空间'], ['项目时间｜YEAR', '2022'], ['项目状态｜STATUS', <>概念方案 / 未建成<br /><i>Concept Proposal / Unbuilt</i></>], ['我的角色｜ROLE', '方案设计 / 效果呈现'],
      ]} /></div></div><Quote>一种看不见、摸不到的感受，如何被转译成可以被身体感知的空间体验？</Quote></Screen>
      <Screen number="02" label="CONTEXT｜项目背景"><div className="copy-layout"><p className="screen-title">如何让“香”被看见？</p><div className="body-copy"><p>这是一个围绕芳香产业文化展开的展陈空间。</p><p>“香”最重要的部分来自嗅觉，但嗅觉无法像图像、文字或实体展品一样，被直接摆放在空间里。</p><p>因此，设计需要回答的并不是单纯“如何展示芳香产业”，而是：</p><Quote>一种看不见、摸不到的感受，如何被转译成可以被身体感知的空间体验？</Quote></div></div></Screen>
      <Screen number="03" label="DESIGN DIRECTION｜设计方向"><div className="copy-layout"><div><p className="accent-label">FROM SCENT TO SENSATION</p><p className="screen-title">从“气味”转向“感受”</p></div><div className="body-copy"><p>空间没有试图把气味具象成某一种固定造型，而是从它的感受方式出发。</p><p>气味会扩散、停留、消散，也会因为人的移动而改变感受。</p><p>因此，设计语言逐渐转向：</p><div className="keyword-row"><span>流动</span><span>半透明</span><span>朦胧</span><span>漂浮</span><span>渐变</span></div></div></div></Screen>
      <Screen number="04" label="SPATIAL LANGUAGE｜空间语言"><div className="copy-layout"><div><p className="accent-label">SPATIAL LANGUAGE</p><p className="screen-title">一条连续的感知路径</p></div><div className="body-copy"><p>整个展馆以曲线作为主要空间语言。</p><p>曲线弱化了传统展陈空间中明确的“房间—走廊—房间”关系，让参观路径更像一段连续发生的体验。</p><p>它没有明确边界，却会随着人的靠近、经过与停留逐渐被感知。</p></div></div></Screen>
      <Screen number="05" label="LIGHT / HAZE / TRANSPARENCY｜光、雾与透明"><div className="three-in-betweens"><p className="screen-title">让空间成为“香”的容器</p><div className="three-in-between-grid"><div><b>LIGHT｜光</b><p>渐变灯带与动态投影让空间界面保持变化。</p></div><div><b>HAZE｜雾</b><p>雾化效果营造氤氲氛围。</p></div><div><b>TRANSPARENCY｜透明</b><p>磨砂玻璃与透明构件削弱实体边界。</p></div></div></div></Screen>
      <Screen number="06" label="SENSORY EXPERIENCE｜从观看到参与"><div className="copy-layout"><div><p className="accent-label">SENSORY EXPERIENCE</p><p className="screen-title">从观看到参与</p></div><div className="body-copy"><p><strong>视觉</strong><br />曲线、光影、透明与渐变。</p><p><strong>嗅觉</strong><br />芳香本身成为展陈内容的一部分。</p><p><strong>移动</strong><br />连续动线让气味与画面在行走中不断变化。</p><p><strong>停留</strong><br />局部节点提供更近距离的观察与体验。</p><Quote><strong>展馆不是一组静态信息的排列，而是一条由不同感官共同完成的参观路径。</strong></Quote></div></div></Screen>
      <Screen number="07" label="RETAIL ENDING｜体验的最后" className="daye-retail-screen"><div className="daye-retail-heading"><p className="accent-label">FROM EXPERIENCE TO PRODUCT</p><p className="screen-title">从文化认识<br />走向产品接触</p></div><figure className="daye-retail-media"><img src="/assets/projects/05-daye-retail.jpg" alt="芳香展馆零售空间效果图" loading="lazy" decoding="async" /></figure><div className="body-copy daye-retail-copy"><p>参观体验最终进入产品展示与零售区域。</p><p>当观众已经通过空间理解芳香产业、植物与气味之间的关系，再接触具体产品时，产品不再只是货架上的商品，而拥有了前面体验所建立的背景。</p><p className="bilingual-line">认识 → 感知 → 体验 → 接触产品<br />Learn → Sense → Experience → Product</p></div></Screen>
      <Screen number="08" label="TAKEAWAY｜项目之后" className="closing-screen"><div className="closing-layout"><div><p className="screen-title">“香”没有固定形状。</p></div><div><p>这个项目最重要的尝试，是寻找一种方法，把原本无法被直接看见的内容转成空间语言。</p><p>因此，空间也不需要替它制造一个明确符号。</p><Quote><strong>当展陈对象本身不可见，空间就成为感知它的媒介。</strong></Quote><p className="status-line">概念方案 / 未建成</p></div></div></Screen>
    </section>
  )
}

const smallIdeaStories = [
  { number: '01', location: '杭州润和山庄', title: '停车位旁的一扇小门', body: '通过设置一扇平时并不使用的小门，利用“门前不合适停车”的心理暗示，达到防止开放式停车位被占用的目的。', image: '/assets/small-ideas/01.jpg' },
  { number: '02', location: '温州世锦园', title: '为邻居准备的一把伞', body: '入口矮墙预留长柄伞位置，在突然下雨时可以让路过邻居临时取用。', image: '/assets/small-ideas/02.jpg' },
  { number: '03', location: '杭州之江门', title: '保留独立的入户门', body: '业主为两个女儿买下相邻的两户别墅，花园内部已经连通，但我们仍然选择保留两个家庭各自的入户仪式感和边界。', image: '/assets/small-ideas/03.jpg' },
]

function SmallIdeasCase() {
  return <section className="case-section small-ideas-case" id="small-ideas"><div className="small-ideas-case-hero"><div className="small-ideas-case-top"><span className="project-no">CASE 06</span><span>DESIGN NOTES / 03 STORIES</span></div><p className="small-ideas-case-english" lang="en">Small Ideas</p><h1>方案中的小想法</h1><p className="small-ideas-case-intro">这里是几个设计中的小故事，记录了那些很小、但与真实生活有关的想法。</p></div><div className="idea-card-stage"><div className="idea-card-row">{smallIdeaStories.map((story) => <article className="idea-card" tabIndex="0" key={story.number}><div className="idea-card-media" role="img" aria-label={`${story.title}图片`}><img src={story.image} alt="" loading="eager" fetchPriority="high" decoding="async" onError={(event) => event.currentTarget.remove()} /><span>{story.number}</span></div><div className="idea-card-copy"><div className="idea-card-meta"><span>{story.number}</span><span>{story.location}</span></div><h2>{story.title}</h2><p>{story.body}</p></div></article>)}</div></div></section>
}

function HowIWork() {
  const steps = [['01 OBSERVE｜观察', '先理解人、场景和真实需求。'], ['02 DEFINE｜定义', '找到真正需要解决的问题。'], ['03 CONCEPT｜构思', '建立一个能够统领项目的核心想法。'], ['04 ORGANIZE｜组织', '把想法转成具体内容、空间、动线和体验。'], ['05 DELIVER｜落地', '面对现场与现实限制持续调整，把方案推进完成。']]
  return <section className="work-method texture-section" id="think"><div className="method-heading"><span>03 / HOW I THINK</span><h2>我的<em>思考过程</em></h2></div><div className="steps-grid">{steps.map(([title, text]) => <div key={title}><b>{title}</b><span>{text}</span></div>)}</div></section>
}

const photographyGroups = [
  { id: 'street', label: 'STREET', title: 'Street Photography｜街头摄影', text: '城市、建筑、人和偶然出现的瞬间。', ratios: ['4 / 5', '3 / 2', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1'] },
  { id: 'landscape', label: 'LANDSCAPE', title: 'Landscape Photography｜风光摄影', text: '自然、天气、植物、动物与安静的空间关系。', ratios: ['3 / 2', '4 / 5', '16 / 10', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1', '16 / 10', '2 / 3', '4 / 3', '3 / 2'] },
  { id: 'interior', label: 'INTERIOR', title: 'Interior Photography｜室内摄影', text: '室内空间、生活细节、光线与物件。', ratios: ['4 / 5', '1 / 1', '3 / 2', '2 / 3'] },
  { id: 'film', label: 'FILM', title: 'Film Photography｜胶片摄影', text: '以胶片记录旅行、日常观察。', ratios: ['3 / 2', '2 / 3', '1 / 1', '4 / 5', '3 / 2', '2 / 3', '1 / 1', '4 / 5', '3 / 2', '2 / 3', '1 / 1', '4 / 5', '3 / 2', '2 / 3'] },
]

const craftSlots = ['4 / 5', '1 / 1', '3 / 2', '2 / 3', '4 / 3', '4 / 5', '3 / 2', '1 / 1']
const ikebanaSlots = ['3 / 2', '4 / 5', '1 / 1', '2 / 3', '4 / 3', '3 / 2', '4 / 5', '1 / 1', '2 / 3', '4 / 3']
const roomSlots = ['3 / 2', '4 / 5']

const galleryFolders = {
  STREET: 'gallery/photography/street',
  LANDSCAPE: 'gallery/photography/landscape',
  INTERIOR: 'gallery/photography/interior',
  FILM: 'gallery/photography/film',
  CRAFT: 'gallery/craft',
  IKEBANA: 'gallery/ikebana',
  DETAIL: 'gallery/room',
}

const makeGalleryItems = (ratios, prefix) => ratios.map((ratio, index) => ({
  id: `${prefix}-${index}`,
  label: `${prefix} / ${String(index + 1).padStart(2, '0')}`,
  ratio,
  src: `/assets/${galleryFolders[prefix]}/${String(index + 1).padStart(2, '0')}.jpg`,
}))

const galleryCatalog = [
  ...photographyGroups.flatMap((group) => makeGalleryItems(group.ratios, group.label)),
  ...makeGalleryItems(craftSlots, 'CRAFT'),
  ...makeGalleryItems(ikebanaSlots, 'IKEBANA'),
  ...makeGalleryItems(roomSlots, 'DETAIL'),
]

function GalleryPlaceholder({ item, onPreview }) {
  const matchImageRatio = (event) => {
    const image = event.currentTarget
    if (image.naturalWidth && image.naturalHeight) image.parentElement.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`
  }
  return <button className="gallery-placeholder" type="button" style={{ aspectRatio: item.ratio }} data-gallery-id={item.id} aria-label={`查看${item.label}`} onClick={() => onPreview?.(item)}><img src={item.src} alt="" loading="lazy" onLoad={matchImageRatio} onError={(event) => event.currentTarget.remove()} /></button>
}

function MasonryGrid({ ratios, prefix, onPreview }) {
  const items = makeGalleryItems(ratios, prefix)
  return <div className="masonry-grid">{items.map((item) => <GalleryPlaceholder key={item.id} item={item} onPreview={onPreview} />)}</div>
}

function OutsideCover() {
  return <section className="outside-cover texture-section" id="outside"><div className="outside-cover-index">04 / OUTSIDE OF WORK</div><div className="outside-cover-copy"><p lang="en">Outside of Work</p><h2>工作之外</h2><Quote>观察、摄影、手作，以及让房间慢慢变成更喜欢的样子。</Quote></div></section>
}

function PhotographySection({ onPreview }) {
  const [activeCategory, setActiveCategory] = useState('street')

  useEffect(() => {
    const sections = document.querySelectorAll('[data-photo-category]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveCategory(entry.target.dataset.photoCategory)
      })
    }, { rootMargin: '-28% 0px -58% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <section className="outside-gallery-section texture-section" id="photography"><aside className="outside-gallery-heading"><span>OUTSIDE 01</span><h2>摄影</h2><p>Photography</p><nav aria-label="摄影分类">{photographyGroups.map((group) => <a className={activeCategory === group.id ? 'is-active' : ''} href={`#photo-${group.id}`} key={group.id}>{group.label}</a>)}</nav></aside><div className="outside-gallery-stream">{photographyGroups.map((group) => <section className="photo-category" id={`photo-${group.id}`} data-photo-category={group.id} key={group.id}><header><h3>{group.title}</h3><p>{group.text}</p></header><MasonryGrid ratios={group.ratios} prefix={group.label} onPreview={onPreview} /></section>)}</div></section>
}

function CraftSection({ onPreview }) {
  return <section className="outside-gallery-section texture-section" id="craft"><aside className="outside-gallery-heading"><span>OUTSIDE 02</span><h2>手作</h2><p>Craft</p><Quote>我很享受一个想法从材料开始，最后变成真实物件的过程。</Quote></aside><div className="outside-gallery-stream"><MasonryGrid ratios={craftSlots} prefix="CRAFT" onPreview={onPreview} /></div></section>
}

function IkebanaSection({ onPreview }) {
  return <section className="outside-gallery-section texture-section" id="ikebana"><aside className="outside-gallery-heading"><span>OUTSIDE 03</span><h2>插花</h2><p>Ikebana</p><Quote>用鲜花装点起居，从枝叶、容器与留白之间，感受生活的美好。</Quote></aside><div className="outside-gallery-stream"><MasonryGrid ratios={ikebanaSlots} prefix="IKEBANA" onPreview={onPreview} /></div></section>
}

function BeforeAfterComparison() {
  const [reveal, setReveal] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateReveal = (event) => {
    if (event.pointerType !== 'mouse' && !dragging) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const next = ((event.clientX - bounds.left) / bounds.width) * 100
    setReveal(Math.min(100, Math.max(0, next)))
  }

  const handleKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') setReveal(0)
    if (event.key === 'End') setReveal(100)
    if (event.key === 'ArrowLeft') setReveal((value) => Math.max(0, value - 5))
    if (event.key === 'ArrowRight') setReveal((value) => Math.min(100, value + 5))
  }

  return <div className="before-after-comparison" role="slider" tabIndex="0" aria-label="房间改造前后对比" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(reveal)} aria-valuetext={`Before ${Math.round(reveal)}%`} onKeyDown={handleKeyDown} onPointerDown={(event) => { setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); updateReveal(event) }} onPointerMove={updateReveal} onPointerUp={(event) => { setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId) }} onPointerCancel={() => setDragging(false)} onPointerLeave={() => { if (!dragging) setReveal(50) }}><div className="comparison-layer comparison-before"><img src="/assets/gallery/room/before.jpg" alt="" draggable="false" onError={(event) => event.currentTarget.remove()} /><span>BEFORE</span></div><div className="comparison-layer comparison-after" style={{ clipPath: `inset(0 0 0 ${reveal}%)` }}><img src="/assets/gallery/room/after.jpg" alt="" draggable="false" onError={(event) => event.currentTarget.remove()} /><span>AFTER</span></div><div className="comparison-divider" style={{ left: `${reveal}%` }} aria-hidden="true"><i>↔</i></div></div>
}

function RoomMakeoverSection({ onPreview }) {
  return <section className="outside-gallery-section texture-section" id="room-makeover"><aside className="outside-gallery-heading"><span>OUTSIDE 04</span><h2>房间改造</h2><p lang="en">Room Makeover</p><Quote>从客厅开始，重新调整颜色、家具、灯光和物件之间的关系，让一个空间慢慢变成更喜欢的样子。</Quote></aside><div className="outside-gallery-stream room-gallery-stream"><BeforeAfterComparison /><p className="before-after">BEFORE → AFTER</p><MasonryGrid ratios={roomSlots} prefix="DETAIL" onPreview={onPreview} /></div></section>
}

function GalleryLightbox({ item, index, count, onClose, onMove }) {
  const [wheelLocked, setWheelLocked] = useState(false)

  useEffect(() => {
    if (!item) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') onMove(1)
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') onMove(-1)
    }
    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onMove])

  if (!item) return null

  const handleWheel = (event) => {
    event.preventDefault()
    if (wheelLocked || Math.abs(event.deltaY) < 12) return
    setWheelLocked(true)
    onMove(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => setWheelLocked(false), 520)
  }

  return <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${item.label}图片预览`} onClick={onClose} onWheel={handleWheel}><div className="gallery-lightbox-stage" onClick={(event) => event.stopPropagation()}><img className="gallery-lightbox-image" src={item.src} alt={item.label} onError={(event) => event.currentTarget.remove()} /></div><div className="gallery-lightbox-caption">{item.label} <i>{index + 1} / {count}</i></div><button className="gallery-lightbox-close" type="button" onClick={onClose} aria-label="退出预览">×</button><div className="gallery-lightbox-controls"><button type="button" onClick={() => onMove(-1)} aria-label="上一张">上一张</button><button type="button" onClick={() => onMove(1)} aria-label="下一张">下一张</button></div></div>
}

function OutsideSection() {
  const [previewId, setPreviewId] = useState(null)
  const previewIndex = galleryCatalog.findIndex((item) => item.id === previewId)
  const preview = previewIndex >= 0 ? galleryCatalog[previewIndex] : null
  const openPreview = (item) => setPreviewId(item.id)
  const movePreview = (direction) => {
    if (previewIndex < 0) return
    const nextIndex = (previewIndex + direction + galleryCatalog.length) % galleryCatalog.length
    setPreviewId(galleryCatalog[nextIndex].id)
  }
  return <><OutsideCover /><PhotographySection onPreview={openPreview} /><CraftSection onPreview={openPreview} /><IkebanaSection onPreview={openPreview} /><RoomMakeoverSection onPreview={openPreview} /><GalleryLightbox item={preview} index={previewIndex} count={galleryCatalog.length} onClose={() => setPreviewId(null)} onMove={movePreview} /></>
}

function ExperienceSection() {
  return <section className="experience-section texture-section" id="experience"><div className="experience-heading"><span>05 / EXPERIENCE</span><h2>工作经历</h2></div><div className="timeline"><article><div className="timeline-date">2021.08 — 2023.03</div><h3>中国美术学院风景建筑设计研究院</h3><p className="timeline-sub">参与项目类型：</p><div className="inline-list">展馆 · 美术馆 · 口袋公园 · 公共空间 · 文旅相关空间</div><p className="timeline-sub">重点能力：</p>{tags(['空间设计', '视觉表达', '公共体验'])}</article><article><div className="timeline-date">2023.03 — 2026.03</div><h3>米人工作室<br /><small>浙江华坤建筑设计院</small></h3><p>参与项目从高端私宅延伸到大型度假酒店、市政公园，并逐渐承担主创设计与项目推进职责。</p><p className="timeline-sub">重点能力：</p>{tags(['主创设计', '客户沟通', '方案汇报', '施工跟进', '落地交付'])}</article><article className="now-entry"><div className="timeline-date">NOW｜现在</div><h3>希望进入文旅内容与运营现场</h3><Quote>我希望把过去在空间项目中积累的体验策划、视觉表达、客户沟通与落地能力，带进更加开放的文旅场景中。</Quote></article></div></section>
}

function AboutSection() {
  return <section className="about-section texture-section" id="about"><div className="about-label">06 / ABOUT</div><div className="about-content"><p>我喜欢从人的真实行为和感受开始思考，也喜欢把一个模糊的念头逐渐整理成可以被看见、参与和使用的东西。</p><p>过去几年，我主要通过空间做这件事。接下来，我希望尝试活动、内容与运营，让一个想法不只停留在方案里，而是真正在现场发生。</p></div></section>
}

function ContactSection() {
  return <footer className="contact-section texture-section" id="contact"><div className="contact-top"><span>07 / CONTACT</span></div><h2>Say <em>Hello.</em></h2><div className="contact-details"><div><span>Email</span><a href="mailto:1062672214@qq.com">1062672214@qq.com</a></div><div><span>Phone / WeChat</span><a href="tel:17326083215">17326083215</a></div><div><span>STATUS</span><strong>Available for opportunities｜目前开放工作机会</strong></div></div><div className="footer-line"><span>PANPAN / PORTFOLIO</span><a href="#top">BACK TO TOP ↑</a></div></footer>
}

const pageTitles = {
  '/': 'PANPAN｜创意策划 × 体验设计',
  '/cases/yangming-hot-spring': '余姚阳明温泉山庄｜PANPAN',
  '/cases/yuelongwan': '余姚悦龙湾｜PANPAN',
  '/cases/qidu-huaqiao-garden': '温州七都华侨花园｜PANPAN',
  '/cases/daye-fragrance-exhibition': '湖北大冶芳香产业文化展馆｜PANPAN',
  '/cases/small-ideas': '方案中的小想法｜PANPAN',
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = pageTitles[pathname] || 'PANPAN｜Portfolio'
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function CaseNext({ next }) {
  return <nav className="case-next" aria-label="案例翻页"><Link to="/#work"><span>BACK TO STORIES</span><strong>返回精选案例</strong></Link><Link className="case-next-link" to={next.to}><span>NEXT CASE</span><strong>{next.label}</strong><b>↗</b></Link></nav>
}

function CasePage({ theme, children, next }) {
  return <main className={`site-shell case-page theme-${theme}`}><SiteHeader theme={theme} />{children}<CaseNext next={next} /></main>
}

function HomePage() {
  return <main className="site-shell"><Hero /><QuickInfo /><SelectedWorks /><HowIWork /><OutsideSection /><ExperienceSection /><AboutSection /><ContactSection /></main>
}

function NotFound() {
  return <main className="not-found texture-section"><span>404</span><h1>页面没有找到</h1><Link className="arrow-link" to="/"><span>返回首页</span><b>↗</b></Link></main>
}

function splitTextNodes(element) {
  const textNodes = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
  })
  let node = walker.nextNode()
  while (node) {
    textNodes.push(node)
    node = walker.nextNode()
  }
  const chars = []
  const closingPunctuation = new Set(['，', '。', '、', '：', '；', '！', '？', '”', '’', '）', '》', '】'])
  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment()
    textNode.nodeValue.split('').forEach((character) => {
      if (closingPunctuation.has(character) && fragment.lastChild) {
        fragment.lastChild.textContent += character
        return
      }
      const span = document.createElement('span')
      span.className = 'scroll-float-char'
      span.textContent = character === ' ' ? '\u00a0' : character
      fragment.appendChild(span)
      chars.push(span)
    })
    textNode.parentNode.replaceChild(fragment, textNode)
  })
  return chars
}

function MotionDirector() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.remove('motion-ready', 'motion-reduced')
    root.classList.add(reduced ? 'motion-reduced' : 'motion-enabled')
    if (reduced) return undefined

    const groups = [
      ['.hero', '.hero-subtitle, .hero-main h1, .hero-english-title, .hero-copy'],
      ['.info-page', '.section-marker, .info-content, .info-content h2'],
      ['.selected-works', '.selected-top, .selected-english, .selected-content-wide h2, .selected-story'],
      ['.work-method', '.method-heading > *, .steps-grid > div, .method-emphasis > *'],
      ['.outside-cover', '.outside-cover-index, .outside-cover-copy > *'],
      ['.outside-gallery-section', '.outside-gallery-heading > span, .outside-gallery-heading > p, .outside-gallery-heading > nav, .outside-gallery-heading > blockquote'],
      ['.photo-category', 'header'],
      ['.experience-section', '.experience-heading > *, .timeline > article'],
      ['.about-section', '.about-label, .about-content > p'],
      ['.contact-section', '.contact-top, .contact-section h2, .contact-details > div, .footer-line'],
      ['.project-intro', '.project-intro-top, .project-name, .project-intro h2, .project-english, .project-summary'],
      ['.screen', '.screen-index, .screen-title, .display-note, .concept-word, .terrace-grid h3, .screen-body > *'],
      ['.case-next', '.case-next > a'],
      ['.small-ideas-case-hero', '.small-ideas-case-top, .small-ideas-case-english, .small-ideas-case h1, .small-ideas-case-intro'],
      ['.idea-card-stage', '.idea-card'],
    ]
    const observed = []

    groups.forEach(([sectionSelector, itemSelector]) => {
      document.querySelectorAll(sectionSelector).forEach((section) => {
        section.classList.add('motion-section')
        section.querySelectorAll(itemSelector).forEach((item, index) => {
          item.classList.add('motion-item')
          item.style.setProperty('--motion-index', index)
          if (item.matches('h1, h2, h3, .screen-title, .display-note, .concept-word, .project-name, .selected-english, .small-ideas-case-english')) {
            item.classList.add('motion-heading')
          }
        })
        observed.push(section)
      })
    })

    const bodyItems = [...document.querySelectorAll('main p, main blockquote, main li, main dt, main dd, main .idea-card-meta')]
      .filter((item) => !item.classList.contains('motion-heading') && !item.classList.contains('motion-item'))
    bodyItems.forEach((item, index) => {
      item.classList.add('motion-body')
      item.style.setProperty('--motion-index', index % 7)
    })

    const galleryItems = [...document.querySelectorAll('.gallery-placeholder')]
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-gallery-visible')
        galleryObserver.unobserve(entry.target)
      })
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' })
    galleryItems.forEach((item, index) => {
      item.style.setProperty('--gallery-index', index % 7)
      galleryObserver.observe(item)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.classList.contains('motion-body') ? 'is-body-inview' : 'is-inview')
        }
      })
    }, { threshold: 0.01, rootMargin: '0px 0px -8% 0px' })
    observed.forEach((section) => observer.observe(section))
    bodyItems.forEach((item) => observer.observe(item))
    document.querySelector('.hero')?.classList.add('is-inview')

    const headingOriginals = []
    const gsapContext = gsap.context(() => {
      document.querySelectorAll('.motion-heading').forEach((heading) => {
        headingOriginals.push([heading, heading.innerHTML])
        heading.classList.add('scroll-float')
        const chars = splitTextNodes(heading)
        gsap.fromTo(chars, {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 1.65,
          scaleX: 0.84,
          transformOrigin: '50% 0%',
        }, {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.028,
          scrollTrigger: {
            trigger: heading,
            start: 'top bottom-=8%',
            end: 'top 38%',
            scrub: 0.8,
          },
        })
      })

      document.querySelectorAll('.idea-card-media, .profile-figure').forEach((item, index) => {
        gsap.fromTo(item, {
          opacity: 0,
          y: 72,
          scale: 0.965,
          filter: 'blur(8px)',
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          delay: (index % 5) * 0.045,
          scrollTrigger: {
            trigger: item,
            start: 'top 94%',
            end: 'top 62%',
            scrub: 0.75,
          },
        })
      })
    })

    const parallaxTargets = [...document.querySelectorAll('.profile-figure img')]
    let frame = 0
    const updateParallax = () => {
      frame = 0
      const midpoint = window.innerHeight * 0.5
      parallaxTargets.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const offset = Math.max(-12, Math.min(12, (midpoint - (rect.top + rect.height / 2)) * 0.035))
        element.style.setProperty('--parallax-y', `${offset}px`)
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax)
    }
    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const readyFrame = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('motion-ready')))

    return () => {
      observer.disconnect()
      galleryObserver.disconnect()
      gsapContext.revert()
      headingOriginals.forEach(([heading, html]) => {
        heading.innerHTML = html
        heading.classList.remove('scroll-float')
      })
      cancelAnimationFrame(frame)
      cancelAnimationFrame(readyFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      root.classList.remove('motion-enabled', 'motion-ready')
    }
  }, [pathname])

  return <div className="opening-mask" aria-hidden="true" />
}

function App() {
  return <><ScrollManager /><MotionDirector /><Routes><Route path="/" element={<HomePage />} /><Route path="/cases/yangming-hot-spring" element={<CasePage theme="dark" next={{ to: '/cases/yuelongwan', label: '余姚悦龙湾' }}><YangmingCase /></CasePage>} /><Route path="/cases/yuelongwan" element={<CasePage theme="dark" next={{ to: '/cases/qidu-huaqiao-garden', label: '温州七都华侨花园' }}><YuelongCase /></CasePage>} /><Route path="/cases/qidu-huaqiao-garden" element={<CasePage theme="dark" next={{ to: '/cases/binrongfu', label: '杭州滨融府' }}><QiduCase /></CasePage>} /><Route path="/cases/binrongfu" element={<CasePage theme="dark" next={{ to: '/cases/daye-fragrance-exhibition', label: '湖北大冶芳香产业文化展馆' }}><BinrongCase /></CasePage>} /><Route path="/cases/daye-fragrance-exhibition" element={<CasePage theme="light" next={{ to: '/cases/small-ideas', label: '方案中的小想法' }}><DayeCase /></CasePage>} /><Route path="/cases/small-ideas" element={<CasePage theme="light" next={{ to: '/#work', label: '返回精选案例' }}><SmallIdeasCase /></CasePage>} /><Route path="*" element={<NotFound />} /></Routes></>
}

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
