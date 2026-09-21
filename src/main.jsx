import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  ['WORK', '#work'],
  ['OUTSIDE', '#outside'],
  ['EXPERIENCE', '#experience'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]

const tags = (items) => (
  <div className="tag-list">
    {items.map((item) => <span key={item}>{item}</span>)}
  </div>
)

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="返回顶部">
        <span>PANPAN</span>
        <small>CREATIVE PLANNING / EXPERIENCE DESIGN</small>
      </a>
      <nav aria-label="页面导航">
        {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
    </header>
  )
}

function ArrowLink({ href, children }) {
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

function ProjectIntro({ number, title, english, summary, tags: projectTags, id }) {
  return (
    <div className="project-intro" id={id}>
      <div className="project-intro-top">
        <span className="project-no">CASE {number}</span>
        {tags(projectTags)}
      </div>
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
          <p className="eyebrow">Creative Planning × Experience Design</p>
          <h1>PANPAN</h1>
          <p className="hero-subtitle">Creative Planning × Experience Design 创意策划×体验设计</p>
          <div className="hero-copy">
            <p>我习惯从人、场景和体验出发，把模糊的需求梳理成清晰的方案，并持续推进到真实落地。</p>
            <p>过去几年，我参与过私宅、酒店、文旅与公共空间项目，从概念、方案、客户沟通一路跟进到施工。现在，我希望把这些积累带到文旅活动策划与运营中，去创造更多真正会被人参与、感受和记住的体验。</p>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span /></div>
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
              ['BACKGROUND', '空间设计背景 / 全流程项目经验'],
              ['CURRENT FOCUS', '文旅活动策划 / 体验策划 / 项目落地执行'],
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

function SelectedWorks() {
  return (
    <section className="selected-works" id="work">
      <div className="selected-top"><span>02</span><span>SELECTED WORKS｜精选项目</span><span>SCROLL / 03</span></div>
      <div className="selected-content">
        <h2>精选<br /><em>项目</em></h2>
        <p className="selected-english">Selected Works</p>
        <div className="work-index">
          <ArrowLink href="#yangming">01 / 阳明温泉山庄</ArrowLink>
          <ArrowLink href="#binrongfu">02 / 滨融府</ArrowLink>
          <ArrowLink href="#yuelongwan">03 / 悦龙湾</ArrowLink>
        </div>
      </div>
      <div className="selected-orbit" aria-hidden="true"><span /></div>
    </section>
  )
}

function YangmingCase() {
  return (
    <section className="case-section texture-section" id="yangming">
      <ProjectIntro number="01" title="一个让人慢下来的地方" english="A Place to Slow Down" summary="通过疗愈体验与既有资源的重新激活，想象一座运营十五年的温泉度假酒店，还可以如何重新变得值得到访。" tags={['文旅策划 Destination Planning', '体验策划 Experience Planning', '概念设计 Concept Development']} />
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
        <div className="insight-layout"><p className="screen-title">重新看见这里已经拥有的东西</p><div className="body-copy"><p>当视线从温泉区域向外打开，我们重新看见了场地中原本就存在的资源：</p><p className="bold-line">茶山、溪流、山林、温泉、茶园，以及周边文化资源。</p><p>它们并不需要被重新制造，而是需要被重新组织。</p><p>因此，我们以温泉、水乐园与明逸轩为核心，通过更开放的视线与动线，把体验向周边自然与文化环境延伸。</p><p>项目问题也从：</p><p className="question-line">“温泉和水乐园应该怎样改？”</p><p>逐渐转向：</p><p className="question-line">“这些已经存在的资源，能否共同组成一种新的度假理由？”</p></div></div>
      </Screen>
      <Screen number="04" label="CORE CONCEPT｜核心概念" className="concept-screen">
        <div className="concept-layout"><div><p className="concept-word">松弛<br />之境</p><p className="small-english">A PLACE TO SLOW DOWN</p></div><div><p className="concept-lead">不是用更多内容填满一段旅程，而是创造一种让人逐渐慢下来、重新感受身体与自然的状态。</p><div className="four-points"><div><b>RETURN｜回归</b><span>回到自然，也回到身体本身。</span></div><div><b>RESTORE｜恢复</b><span>暂时退出日常，重新获得能量。</span></div><div><b>CONNECT｜连接</b><span>与家人、同行者和自然重新发生关系。</span></div><div><b>SENSE｜感知</b><span>重新听见风、闻到香、看见星空和日落。</span></div></div></div></div>
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
      <ProjectIntro number="02" title="从方案到现场" english="From Idea to Reality" summary="在两个与室内生活紧密相连的屋顶露台中，协调不同的使用场景与审美偏好，并在施工阶段面对荷载、设备等真实条件持续调整，最终完成落地。" tags={['全流程设计 Full-process Design', '客户沟通 Client Communication', '落地执行 Project Delivery']} />
      <Screen number="01" label="PROJECT OVERVIEW｜项目概览" className="overview-screen"><div className="screen-columns two-col"><div><p className="display-note">从方案<br />到现场</p><p className="small-english">FROM IDEA TO REALITY</p></div><div><MetaList items={[
        ['项目类型｜TYPE', '高端大平层双露台花园'], ['项目时间｜YEAR', '2024'], ['项目面积｜AREA', '约140㎡'], ['项目状态｜STATUS', <>已交付<br /><i>Completed</i></>],
      ]} /><div className="role-block"><span>我的角色｜MY ROLE</span>{tags(['主创设计', '方案深化', '视觉表达', '植物设计', '施工跟进', '客户沟通'])}</div></div></div></Screen>
      <Screen number="02" label="TWO TERRACES｜两个露台，两种生活场景"><div className="terrace-grid"><div><p className="accent-label">EAST TERRACE｜东露台</p><h3>东露台对应客厅，是一个面积较小、较为狭长的 L 形空间。</h3><p>沿墙设置与景墙结合的立体叠水水景，并加入盆景展示台、景石以及灌木球与杂木风格植物，让有限进深仍拥有丰富层次。</p><p>折叠式小吧台减少了固定家具对空间的占用，需要时展开，可以成为独处、吹风与品酒的位置。</p></div><div><p className="accent-label">WEST TERRACE｜西露台</p><h3>西露台对应茶室，面积更大，承担喝茶、朋友小聚与日常休闲。</h3><p>竹篱、植物、阳伞与沙发卡座共同组织出更完整的户外会客空间。</p></div></div></Screen>
      <Screen number="03" label="PRIVACY AS EXPERIENCE"><div className="copy-layout privacy-layout"><p className="screen-title">PRIVACY AS EXPERIENCE</p><div className="body-copy"><p>高层住宅露台与周边建筑距离较近，邻里之间容易产生直接对视。</p><p>因此，我们通过不同尺度的植物、竹篱、景墙与景观构筑形成多层次遮挡，同时尽量保留露台自身的开放感。</p><Quote>私密性的目的，是让业主真正愿意坐下来，并长时间使用这个空间。</Quote></div></div></Screen>
      <Screen number="04" label="LOAD LIMITATION"><div className="load-layout"><p className="screen-title">LOAD LIMITATION</p><div><p>屋顶露台能够承受的荷载有限，原有覆土、景石和植物配置都需要重新核算。</p><p>针对现场条件，我们进行了三项调整：</p><ul className="editorial-list"><li><strong>景石轻量化</strong>：部分景石内部掏空，只保留外部造型壳体。</li><li><strong>减少覆土</strong>：缩小覆土范围，并降低部分区域覆土高度。</li><li><strong>调整植物配置</strong>：根据新的种植条件重新调整植物种类与组合。</li></ul></div></div></Screen>
      <Screen number="05" label="EXHAUST OUTLET"><div className="copy-layout exhaust-layout"><p className="screen-title">EXHAUST<br />OUTLET</p><div className="body-copy"><p>现场存在一个体量明显的建筑主烟道排风口。</p><p>设备无法移动，却直接暴露在主要景观区域中。</p><p>因此方案重新组织了排风口周围的景观关系，通过景墙、水景、植物与构造进行隐蔽化处理，在保证设备正常工作的前提下，降低它对主要视线的影响。</p></div></div></Screen>
      <Screen number="06" label="FROM RENDER TO REALITY" className="closing-screen"><div className="render-layout"><div><p className="screen-title">FROM RENDER<br />TO REALITY</p><Quote>执行力，是让一个想法经历真实条件之后，仍然能够成立。</Quote></div><div><p>这个项目从前期客户沟通、方案设计、效果表达和植物设计，一直延续到施工阶段的现场调整与最终交付。</p><p>现场出现变化时，我们根据实际条件修改设计，再继续推进下一步。</p><p>最终完成的空间，也成为检验这些判断最直接的结果。</p><p className="process-line">需求 → 方案 → 深化 → 现场 → 调整 → 落地</p></div></div></Screen>
    </section>
  )
}

function YuelongCase() {
  return (
    <section className="case-section texture-section" id="yuelongwan">
      <ProjectIntro number="03" title="两栋房子之间" english="Designing the In-Between" summary="在接待与起居、车行与花园、现代与日式之间，为两栋用途不同的别墅建立一个完整而自然的空间系统。" tags={['私宅景观 Residential Landscape', '空间系统 Spatial System', '体验组织 Experience Planning']} />
      <Screen number="01" label="PROJECT OVERVIEW｜项目概览" className="overview-screen"><div className="screen-columns two-col"><div><p className="display-note">两栋房子<br />之间</p><p className="small-english">DESIGNING THE IN-BETWEEN</p></div><div><MetaList items={[
        ['项目类型｜TYPE', '双别墅合并花园'], ['项目时间｜YEAR', '2025'], ['项目面积｜AREA', '约1600㎡'], ['项目状态｜STATUS', <>施工进行中<br /><i>Under Construction</i></>],
      ]} /><div className="role-block"><span>我的角色｜MY ROLE</span>{tags(['主创设计', '方案深化', '视觉表达', '植物设计', '施工跟进', '客户沟通'])}</div></div></div></Screen>
      <Screen number="02" label="PROJECT BACKGROUND｜项目背景"><div className="copy-layout"><p className="screen-title">两栋相邻的房子，需要一个怎样的花园？</p><div className="body-copy"><p>业主先后购入两栋相邻别墅，并希望将原本彼此独立的庭院合并成一个整体花园。</p><p>其中一栋偏向接待、聚会与会所式使用，另一栋则主要服务家庭日常起居。</p><p>与此同时，建筑气质偏现代海派 / 现代法式，业主本人却更偏爱安静、自然的日式庭院。</p><p>真正需要解决的是：</p><Quote>如何让行车入户与花园生活彼此连接却互不干扰，同时让不同功能与风格自然过渡？</Quote></div></div></Screen>
      <Screen number="03" label="THREE GARDENS｜三个花园，一套系统"><div className="garden-layout"><p className="screen-title">三个花园，一套系统</p><div className="garden-list"><div><b>01 入户花园｜Arrival Garden</b><span>承担到达、行车、停车与建筑展示。</span></div><div><b>02 主花园｜Main Garden</b><span>位于两栋建筑之间，以大草坪为核心，是主要公共生活空间。</span></div><div><b>03 休闲花园｜Leisure Garden</b><span>位于起居建筑南侧，对应挑空客厅落地玻璃，以镜面水景、植物和沿河空间形成更安静的日常停留场景。</span></div></div><p className="sequence-line">到达 → 进入 → 停留 → 生活</p></div></Screen>
      <Screen number="04" label="ARRIVAL & PARKING"><div className="copy-layout arrival-layout"><p className="screen-title">让车进入花园，但不让车主导花园</p><div className="body-copy"><p className="accent-label">ARRIVAL &amp; PARKING</p><p>两栋建筑之间的连接空间同时需要承担进入、到达、停车、转向和通行。</p><p>设计将停车功能直接整合进入户花园：</p><p>车辆停留时，这里完成停车与上下客；<br />车辆离开后，它又重新成为完整的建筑入户空间。</p><p className="bilingual-line">Arrival Garden ↔ Parking<br />入户空间 ↔ 停车空间</p></div></div></Screen>
      <Screen number="05" label="INSIDE & OUTSIDE"><div className="copy-layout inside-layout"><p className="screen-title">室内与室外之间</p><div className="body-copy"><p className="accent-label">INSIDE &amp; OUTSIDE</p><p>起居建筑南侧的大面积落地玻璃直接面向休闲花园。</p><p>镜面水景贴近建筑展开，让人在客厅中就能感知花园；走出室内后，空间又自然过渡到休闲停留与沿河步行。</p><p>地下层采光井则被进一步转化为可使用的半户外休闲空间：</p><p className="bilingual-line">Lightwell → Semi-outdoor Lounge<br />采光井 → 半户外休闲空间</p></div></div></Screen>
      <Screen number="06" label="MODERN & JAPANESE"><div className="copy-layout modern-layout"><p className="screen-title">现代与日式之间</p><div className="body-copy"><p className="accent-label">MODERN &amp; JAPANESE</p><p>业主偏爱日式庭院，但建筑本身具有较明显的现代气质。</p><p>设计不直接拼接两种风格，而是通过空间序列让风格逐渐转换：</p><p className="bilingual-line">FORMAL → NATURAL<br />正式 → 自然</p><p>入户花园更理性、正式；<br />进入主花园与休闲花园后，植物、石材、水景和路径逐渐变得更加自然、松弛。</p></div></div></Screen>
      <Screen number="07" label="A DIFFERENT POINT OF VIEW" className="closing-screen"><div className="viewpoint-layout"><div><p className="screen-title">改变观看花园的位置</p><p className="accent-label">A DIFFERENT POINT OF VIEW</p></div><div className="body-copy"><p>主花园最远端设置了一座相对独立的休闲亭。</p><p>它除了承担喝茶、棋牌与日常停留，也改变了人观看整个花园的位置。</p><p>通常，人从住宅内部向外看花园：</p><p className="bilingual-line">House → Garden</p><p>走到花园最远端后，观看方向第一次反转：</p><p className="bilingual-line">House → Garden → Pavilion → Look Back</p><Quote>很多时候，设计不是继续增加新的内容，而是重新安排人与空间之间的关系。</Quote><p className="italic-line">Designing relationships, not just spaces.</p></div></div></Screen>
    </section>
  )
}

function HowIWork() {
  const steps = [['01 OBSERVE｜观察', '先理解人、场景和真实需求。'], ['02 DEFINE｜定义', '找到真正需要解决的问题。'], ['03 CONCEPT｜构思', '建立一个能够统领项目的核心想法。'], ['04 ORGANIZE｜组织', '把想法转成具体内容、空间、动线和体验。'], ['05 DELIVER｜落地', '面对现场与现实限制持续调整，把方案推进完成。']]
  return <section className="work-method texture-section"><div className="method-heading"><span>06 / HOW I WORK</span><h2>从一个想法，<br /><em>到真实发生</em></h2><p>From Idea to Reality</p></div><div className="steps-grid">{steps.map(([title, text]) => <div key={title}><b>{title}</b><span>{text}</span></div>)}</div><div className="method-emphasis"><span>Concept → Experience → Execution</span><strong>想法 → 体验 → 落地</strong></div></section>
}

function OutsideSection() {
  const categories = [['Street Photography｜街头摄影', '城市、建筑、人和偶然出现的瞬间。'], ['Landscape Photography｜风光摄影', '自然、天气、植物、动物与安静的空间关系。'], ['Interior Photography｜室内摄影', '室内空间、生活细节、光线与物件。'], ['Film Photography｜胶片摄影', '以胶片记录旅行、日常和更缓慢的观察。']]
  return <section className="outside-section texture-section" id="outside"><div className="outside-intro"><span>07 / OUTSIDE OF WORK</span><h2>工作<br /><em>之外</em></h2><Quote>工作之外，我也很喜欢观察、动手和创造一些具体的东西。</Quote></div><div className="outside-body"><div className="photo-side-label"><span>PHOTOGRAPHY｜摄影</span><div>STREET<br />LANDSCAPE<br />INTERIOR<br />FILM</div></div><div className="photo-notes">{categories.map(([title, text], index) => <article className={`photo-note note-${index + 1}`} key={title}><div className="note-surface"><i /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="outside-practice"><div><span>CRAFT｜手作</span><Quote>我很享受一个想法从材料开始，最后变成真实物件的过程。</Quote></div><div><span>FLORAL｜插花</span><Quote>植物、颜色、比例和一点点偶然。</Quote></div><div><span>ROOM MAKEOVER｜房间改造</span><Quote>从客厅开始，重新调整颜色、家具、灯光和物件之间的关系，让一个空间慢慢变成更喜欢的样子。</Quote><p className="before-after">BEFORE → AFTER</p></div></div></div></section>
}

function ExperienceSection() {
  return <section className="experience-section texture-section" id="experience"><div className="experience-heading"><span>08 / EXPERIENCE</span><h2>经历</h2></div><div className="timeline"><article><div className="timeline-date">2021.08 — 2023.03</div><h3>中国美术学院风景建筑设计研究院</h3><p className="timeline-sub">参与项目类型：</p><div className="inline-list">展馆 · 美术馆 · 口袋公园 · 公共空间 · 文旅相关空间</div><p className="timeline-sub">重点能力：</p>{tags(['空间设计', '视觉表达', '公共体验'])}</article><article><div className="timeline-date">2023.03 — 2026.03</div><h3>米人工作室<br /><small>浙江华坤建筑设计院</small></h3><p>参与项目从高端私宅延伸到大型度假酒店、市政公园，并逐渐承担主创设计与项目推进职责。</p><p className="timeline-sub">重点能力：</p>{tags(['主创设计', '客户沟通', '方案汇报', '施工跟进', '落地交付'])}</article><article className="now-entry"><div className="timeline-date">NOW｜现在</div><h3>希望进入文旅内容与运营现场</h3><Quote>我希望把过去在空间项目中积累的体验策划、视觉表达、客户沟通与落地能力，带进更加开放的文旅场景中。</Quote></article></div></section>
}

function AboutSection() {
  return <section className="about-section texture-section" id="about"><div className="about-label">09 / ABOUT</div><div className="about-content"><p>我喜欢从人的真实行为和感受开始思考，也喜欢把一个模糊的念头逐渐整理成可以被看见、参与和使用的东西。</p><p>过去几年，我主要通过空间做这件事。接下来，我希望尝试活动、内容与运营，让一个想法不只停留在方案里，而是真正在现场发生。</p></div></section>
}

function ContactSection() {
  return <footer className="contact-section texture-section" id="contact"><div className="contact-top"><span>10 / CONTACT</span></div><h2>Say<br /><em>Hello.</em></h2><div className="contact-details"><div><span>Email</span><a href="mailto:1062672214@qq.com">1062672214@qq.com</a></div><div><span>Phone / WeChat</span><a href="tel:17326083215">17326083215</a></div><div><span>STATUS</span><strong>Available for opportunities｜目前开放工作机会</strong></div></div><div className="footer-line"><span>PANPAN / PORTFOLIO</span><a href="#top">BACK TO TOP ↑</a></div></footer>
}

function App() {
  return <main className="site-shell"><Hero /><QuickInfo /><SelectedWorks /><YangmingCase /><BinrongCase /><YuelongCase /><HowIWork /><OutsideSection /><ExperienceSection /><AboutSection /><ContactSection /></main>
}

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
createRoot(document.getElementById('root')).render(<App />)
